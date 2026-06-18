import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useLoad } from '@tarojs/taro';
import HomePage from '@/components/HomePage';

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

export default function Index() {
  useLoad(() => {
    console.log('轻奢沙龙预约小程序加载完成');
  });

  const handleBookNow = () => {
    Taro.switchTab({ url: '/pages/booking/index' });
  };

  return (
    <View className="min-h-screen bg-background">
      <HomePage storeInfo={storeInfo} onBookNow={handleBookNow} />
    </View>
  );
}
