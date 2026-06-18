import { supabase } from '@/supabase/client';

export async function getStoreInfo() {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`获取门店信息失败: ${error.message}`);
  return data;
}

export async function getServices(category?: string) {
  let query = supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) throw new Error(`获取服务列表失败: ${error.message}`);
  return data || [];
}

export async function getStaffByService(serviceId: string) {
  const { data, error } = await supabase
    .from('staff_services')
    .select('staff_id')
    .eq('service_id', serviceId);

  if (error) throw new Error(`获取技师列表失败: ${error.message}`);

  const staffIds = data?.map(item => item.staff_id) || [];
  
  if (staffIds.length === 0) {
    const { data: allStaff, error: staffError } = await supabase
      .from('staff')
      .select('*')
      .eq('is_active', true);
    
    if (staffError) throw new Error(`获取技师列表失败: ${staffError.message}`);
    return allStaff || [];
  }

  const { data: staff, error: staffError } = await supabase
    .from('staff')
    .select('*')
    .in('id', staffIds)
    .eq('is_active', true);

  if (staffError) throw new Error(`获取技师列表失败: ${staffError.message}`);
  return staff || [];
}

export async function getTimeSlots(staffId: string, serviceId: string, date: string) {
  const { data, error } = await supabase
    .from('time_slots')
    .select('*')
    .eq('staff_id', staffId)
    .eq('service_id', serviceId)
    .eq('date', date)
    .eq('is_available', true)
    .order('start_time');

  if (error) throw new Error(`获取时间段失败: ${error.message}`);
  return data || [];
}

export async function createAppointment(appointment: {
  serviceId: string;
  staffId: string;
  timeSlotId: string;
  userName: string;
  userPhone: string;
  guestCount: number;
  notes?: string;
  isFirstVisit: boolean;
  wechat?: string;
  memberNo?: string;
  date: string;
  time: string;
}) {
  const reservationNo = `RES${Date.now().toString().slice(-8)}`;

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      reservation_no: reservationNo,
      service_id: appointment.serviceId,
      staff_id: appointment.staffId,
      time_slot_id: appointment.timeSlotId,
      user_name: appointment.userName,
      user_phone: appointment.userPhone,
      guest_count: appointment.guestCount,
      notes: appointment.notes,
      is_first_visit: appointment.isFirstVisit,
      wechat: appointment.wechat,
      member_no: appointment.memberNo,
      status: 'pending',
      date: appointment.date,
      time: appointment.time,
    })
    .select();

  if (error) throw new Error(`创建预约失败: ${error.message}`);
  if (!data || data.length === 0) throw new Error('创建预约失败：可能被 RLS 策略拦截');

  // 更新时间段的已预约数
  await supabase
    .from('time_slots')
    .update({ booked_count: supabase.rpc('increment_booked_count', { slot_id: appointment.timeSlotId }) })
    .eq('id', appointment.timeSlotId);

  return data[0];
}

export async function getUserAppointments(phone: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      services (name),
      staff (name)
    `)
    .eq('user_phone', phone)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`获取预约记录失败: ${error.message}`);
  return data || [];
}
