import { useState } from 'react';
import { View } from '@tarojs/components';
import HomePage from '@/components/HomePage';
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

// Mock 数据 - 门店信息
const storeInfo = {
  name: 'LUMIÈRE 美学沙龙',
  slogan: '精致生活，从细节开始',
  rating: 4.9,
  businessHours: '10:00 - 21:00',
  distance: '1.2km',
  address: '上海市静安区南京西路1266号恒隆广场3层',
  logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
  heroImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop'
};

// Mock 数据 - 服务项目
const services: ServiceItem[] = [
  {
    id: '1',
    name: '鎏金焕肤护理',
    description: '深层滋养，重现肌肤光泽',
    price: 398,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop'
  },
  {
    id: '2',
    name: '珍珠光感美甲',
    description: '法式优雅，指尖艺术',
    price: 268,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop'
  },
  {
    id: '3',
    name: '高定眉睫设计',
    description: '精雕细琢，自然灵动',
    price: 328,
    duration: 75,
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=800&fit=crop'
  },
  {
    id: '4',
    name: '深层舒缓 SPA',
    description: '身心放松，重获平衡',
    price: 598,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1544161515461-93c3a283f4cb?w=600&h=800&fit=crop'
  },
  {
    id: '5',
    name: '奢宠手部护理',
    description: '细致呵护，柔嫩如初',
    price: 198,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=800&fit=crop'
  },
  {
    id: '6',
    name: '定制发型设计',
    description: '个性剪裁，时尚造型',
    price: 458,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=800&fit=crop'
  }
];

// Mock 数据 - 技师信息
const staffMembers: StaffMember[] = [
  {
    id: '1',
    name: '林雅婷',
    title: '首席美容师',
    specialties: ['面部护理', 'SPA'],
    yearsOfExperience: 8,
    rating: 4.9,
    serviceCount: 1280,
    keywords: ['专业', '细致', '温柔'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '2',
    name: '陈思琪',
    title: '高级美甲师',
    specialties: ['美甲', '手足护理'],
    yearsOfExperience: 6,
    rating: 4.8,
    serviceCount: 960,
    keywords: ['创意', '精准', '耐心'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '3',
    name: '王美琳',
    title: '资深发型师',
    specialties: ['剪发', '染发', '造型'],
    yearsOfExperience: 10,
    rating: 4.9,
    serviceCount: 1560,
    keywords: ['时尚', '专业', '审美佳'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '4',
    name: '张雨萱',
    title: '眉睫设计师',
    specialties: ['眉毛', '睫毛', '纹绣'],
    yearsOfExperience: 5,
    rating: 4.7,
    serviceCount: 780,
    keywords: ['精细', '自然', '审美在线'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
  }
];

// Mock 数据 - 日期
const dates: DateCard[] = [
  { date: '2026-06-18', dayOfWeek: '今天', available: true },
  { date: '2026-06-19', dayOfWeek: '周五', available: true },
  { date: '2026-06-20', dayOfWeek: '周六', available: true },
  { date: '2026-06-21', dayOfWeek: '周日', available: false },
  { date: '2026-06-22', dayOfWeek: '周一', available: true },
  { date: '2026-06-23', dayOfWeek: '周二', available: true },
  { date: '2026-06-24', dayOfWeek: '周三', available: true },
];

// Mock 数据 - 时间段
const timeSlots: TimeSlot[] = [
  { time: '10:00', available: true },
  { time: '10:30', available: true },
  { time: '11:00', available: false },
  { time: '11:30', available: true },
  { time: '13:00', available: true },
  { time: '13:30', available: true },
  { time: '14:00', available: false },
  { time: '14:30', available: true },
  { time: '15:00', available: true },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
  { time: '16:30', available: false },
];

export default function Index() {
  const [step, setStep] = useState<'home' | 'service' | 'staff' | 'time' | 'contact' | 'confirm'>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
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

  const handleBookNow = () => {
    setStep('service');
  };

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
    // 生成预约编号
    const reservationNo = `RES${Date.now().toString().slice(-8)}`;
    setStep('confirm');
  };

  const handleBackToHome = () => {
    setStep('home');
    setSelectedService(null);
    setSelectedStaff(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setContactForm({
      name: '',
      phone: '',
      guestCount: 1,
      notes: '',
      isFirstVisit: true,
      wechat: '',
      memberNo: ''
    });
  };

  return (
    <View className="min-h-screen bg-background">
      {step === 'home' && (
        <HomePage storeInfo={storeInfo} onBookNow={handleBookNow} />
      )}
      
      {step === 'service' && (
        <ServiceList 
          services={services} 
          onSelectService={handleSelectService} 
        />
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
