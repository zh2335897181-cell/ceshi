import type { Database } from '@/supabase/types';

// ==================== 服务项目 ====================
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // 分钟
  image: string;
}

export interface ServiceListProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
}

// ==================== 技师/顾问 ====================
export interface StaffMember {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  yearsOfExperience: number;
  rating: number;
  serviceCount: number;
  keywords: string[];
  avatar: string;
}

export interface StaffListProps {
  staff: StaffMember[];
  selectedStaffId: string | null;
  onSelectStaff: (staff: StaffMember) => void;
}

// ==================== 可预约时间 ====================
export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DateCard {
  date: string;
  dayOfWeek: string;
  available: boolean;
}

export interface TimeSelectorProps {
  dates: DateCard[];
  selectedDate: string | null;
  timeSlots: TimeSlot[];
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

// ==================== 用户联系信息 ====================
export interface ContactForm {
  name: string;
  phone: string;
  guestCount: number;
  notes: string;
  isFirstVisit: boolean;
  wechat?: string;
  memberNo?: string;
}

export interface ContactFormProps {
  form: ContactForm;
  onChange: (field: keyof ContactForm, value: any) => void;
  onSubmit: () => void;
}

// ==================== 预约确认 ====================
export interface ReservationConfirm {
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  address: string;
  userName: string;
  phone: string;
  reservationNo: string;
}

export interface ReservationConfirmProps {
  reservation: ReservationConfirm;
  onBackToHome: () => void;
}

// ==================== 首页 ====================
export interface StoreInfo {
  name: string;
  slogan: string;
  rating: number;
  businessHours: string;
  distance: string;
  address: string;
  logo: string;
  heroImage: string;
}

export interface HomePageProps {
  storeInfo: StoreInfo;
  onBookNow: () => void;
}

// ==================== 预约记录 ====================
export interface ReservationRecord {
  id: string;
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  status: 'pending' | 'completed' | 'cancelled';
  reservationNo: string;
  createdAt: string;
}

export interface MyReservationsProps {
  reservations: ReservationRecord[];
  onViewDetail: (reservation: ReservationRecord) => void;
}

// ==================== 用户信息 ====================
export interface UserProfile {
  name: string;
  phone: string;
  avatar: string;
  memberLevel: string;
  points: number;
  coupons: number;
}

// ==================== 底部导航 ====================
export type TabBarPage = 'home' | 'services' | 'booking' | 'profile';
