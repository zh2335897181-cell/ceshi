import { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ServiceList from '@/components/ServiceList';
import StaffList from '@/components/StaffList';
import TimeSelector from '@/components/TimeSelector';
import ContactForm from '@/components/ContactForm';
import ReservationConfirm from '@/components/ReservationConfirm';
import type { 
  ServiceItem, 
  StaffMember, 
  DateCard, 
  TimeSlot, 
  ContactForm as ContactFormType,
  ReservationConfirm as ReservationConfirmType
} from '@/types';

const storeInfo = {
  name: 'LUMIÈRE 美学沙龙',
  address: '上海市静安区南京西路1266号恒隆广场3层'
};

const services: ServiceItem[] = [
  { id: '1', name: '鎏金焕肤护理', description: '深层滋养，重现肌肤光泽', price: 398, duration: 90, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop' },
  { id: '2', name: '珍珠光感美甲', description: '法式优雅，指尖艺术', price: 268, duration: 60, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop' },
  { id: '3', name: '高定眉睫设计', description: '精雕细琢，自然灵动', price: 328, duration: 75, image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=800&fit=crop' },
  { id: '4', name: '深层舒缓 SPA', description: '身心放松，重获平衡', price: 598, duration: 120, image: 'https://images.unsplash.com/photo-1544161515461-93c3a283f4cb?w=600&h=800&fit=crop' }
];

const staffMembers: StaffMember[] = [
  { id: '1', name: '林雅婷', title: '首席美容师', specialties: ['面部护理', 'SPA'], yearsOfExperience: 8, rating: 4.9, serviceCount: 1280, keywords: ['专业', '细致'], avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face' },
  { id: '2', name: '陈思琪', title: '高级美甲师', specialties: ['美甲', '手足护理'], yearsOfExperience: 6, rating: 4.8, serviceCount: 960, keywords: ['创意', '精准'], avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
  { id: '3', name: '王美琳', title: '资深发型师', specialties: ['剪发', '染发'], yearsOfExperience: 10, rating: 4.9, serviceCount: 1560, keywords: ['时尚', '专业'], avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face' }
];

const dates: DateCard[] = [
  { date: '2026-06-18', dayOfWeek: '今天', available: true },
  { date: '2026-06-19', dayOfWeek: '周五', available: true },
  { date: '2026-06-20', dayOfWeek: '周六', available: true },
  { date: '2026-06-21', dayOfWeek: '周日', available: false },
  { date: '2026-06-22', dayOfWeek: '周一', available: true }
];

const timeSlots: TimeSlot[] = [
  { time: '10:00', available: true },
  { time: '10:30', available: true },
  { time: '11:00', available: false },
  { time: '13:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: true }
];

export default function BookingPage() {
  // 从本地存储读取已选服务
  const savedService = Taro.getStorageSync('selectedService');

  const [step, setStep] = useState<'service' | 'staff' | 'time' | 'contact' | 'confirm'>(
    savedService ? 'staff' : 'service'
  );
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(savedService || null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState<ContactFormType>({
    name: '',
    phone: '',
    guestCount: 1,
    notes: '',
    isFirstVisit: true,
    wechat: '',
    memberNo: ''
  });

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setStep('staff');
  };

  const handleSelectStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setStep('time');
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep('contact');
  };

  const handleFormChange = (field: keyof ContactFormType, value: any) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitBooking = () => {
    setStep('confirm');
  };

  const handleBackToHome = () => {
    Taro.switchTab({ url: '/pages/index/index' });
  };

  const goToServices = () => {
    Taro.switchTab({ url: '/pages/services/index' });
  };

  return (
    <View className="min-h-screen bg-background">
      {step === 'service' && !selectedService && (
        <View className="px-6 pt-12 pb-6 text-center">
          <Text className="text-obsidian-black text-xl font-serif font-medium mb-4 block">请选择服务项目</Text>
          <Text className="text-muted-foreground text-sm mb-6 block">或前往项目页浏览更多服务</Text>
          <View
            className="bg-obsidian-black rounded-md py-3 flex items-center justify-center"
            style={{ borderColor: 'rgba(201, 169, 110, 0.5)', borderWidth: 1 }}
            onClick={goToServices}
          >
            <Text className="text-champagne-gold text-base">去项目页选择</Text>
          </View>
        </View>
      )}

      {step === 'service' && selectedService && (
        <ServiceList services={services} onSelectService={handleSelectService} />
      )}

      {step === 'staff' && (
        <StaffList 
          staff={staffMembers}
          selectedStaffId={selectedStaff?.id || null}
          onSelectStaff={handleSelectStaff}
        />
      )}

      {step === 'time' && (
        <TimeSelector
          dates={dates}
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          onSelectDate={handleSelectDate}
          onSelectTime={handleSelectTime}
        />
      )}

      {step === 'contact' && (
        <ContactForm
          form={contactForm}
          onChange={handleFormChange}
          onSubmit={handleSubmitBooking}
        />
      )}

      {step === 'confirm' && selectedService && selectedStaff && selectedDate && selectedTime && (
        <ReservationConfirm
          reservation={{
            serviceName: selectedService.name,
            staffName: selectedStaff.name,
            date: selectedDate,
            time: selectedTime,
            address: storeInfo.address,
            userName: contactForm.name,
            phone: contactForm.phone,
            reservationNo: `RES${Date.now().toString().slice(-8)}`
          }}
          onBackToHome={handleBackToHome}
        />
      )}
    </View>
  );
}
