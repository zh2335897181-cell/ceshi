import { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ServiceList from '@/components/ServiceList';
import type { ServiceItem } from '@/types';

const services: ServiceItem[] = [
  { id: '1', name: '鎏金焕肤护理', description: '深层滋养，重现肌肤光泽', price: 398, duration: 90, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop' },
  { id: '2', name: '珍珠光感美甲', description: '法式优雅，指尖艺术', price: 268, duration: 60, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop' },
  { id: '3', name: '高定眉睫设计', description: '精雕细琢，自然灵动', price: 328, duration: 75, image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=800&fit=crop' },
  { id: '4', name: '深层舒缓 SPA', description: '身心放松，重获平衡', price: 598, duration: 120, image: 'https://images.unsplash.com/photo-1544161515461-93c3a283f4cb?w=600&h=800&fit=crop' },
  { id: '5', name: '奢宠手部护理', description: '细致呵护，柔嫩如初', price: 198, duration: 45, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=800&fit=crop' },
  { id: '6', name: '定制发型设计', description: '个性剪裁，时尚造型', price: 458, duration: 90, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=800&fit=crop' }
];

export default function ServicesPage() {
  const handleSelectService = (service: ServiceItem) => {
    Taro.setStorageSync('selectedService', service);
    Taro.switchTab({ url: '/pages/booking/index' });
  };

  return (
    <View className="min-h-screen bg-background">
      <ScrollView scrollY className="h-full">
        <ServiceList services={services} onSelectService={handleSelectService} />
      </ScrollView>
    </View>
  );
}
