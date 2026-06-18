import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import type { HomePageProps } from '@/types';

const featureTags = [
  { icon: 'i-lucide-sparkles', text: '专业护理' },
  { icon: 'i-lucide-heart', text: '贴心服务' },
  { icon: 'i-lucide-award', text: '品质保证' },
  { icon: 'i-lucide-clock', text: '准时预约' }
];

const hotServices = [
  { name: '鎏金焕肤', price: '¥398起', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop' },
  { name: '珍珠美甲', price: '¥268起', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop' },
  { name: '高定眉睫', price: '¥328起', image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=300&h=300&fit=crop' }
];

const HomePage = ({ storeInfo, onBookNow }: HomePageProps) => {
  return (
    <View className="min-h-screen bg-pearl-white">
      {/* 首屏背景图 */}
      <View className="relative h-80 overflow-hidden">
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src={storeInfo.heroImage}
          mode="aspectFill"
        />
        <View className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3), rgba(0,0,0,0.7))' }} />
        <View className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(250,249,246,0.2), transparent)' }} />

        {/* 顶部信息区 */}
        <View className="absolute top-0 left-0 right-0 pt-12 px-6">
          <View className="flex items-center gap-4 mb-6 animate-fade-in-up">
            <View className="relative">
              <Image
                className="w-14 h-14 rounded-sm border-2 shadow-lg"
                style={{ borderColor: 'rgba(201,169,110,0.5)' }}
                src={storeInfo.logo}
                mode="aspectFit"
              />
              <View className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c9a96e' }}>
                <View className="i-lucide-check w-3 h-3 text-obsidian-black" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="font-serif text-pearl-white text-xl tracking-wide font-medium">
                {storeInfo.name}
              </Text>
              <Text className="text-champagne-gold/80 text-xs tracking-wider mt-1 block">
                {storeInfo.slogan}
              </Text>
            </View>
          </View>

          {/* 评分和距离徽章 */}
          <View className="flex gap-3">
            <View className="rounded-sm px-3 py-2 flex items-center gap-2 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
              <View className="i-lucide-star w-4 h-4 text-champagne-gold fill-current" />
              <Text className="text-obsidian-black text-xs font-medium">{storeInfo.rating}</Text>
            </View>
            <View className="rounded-sm px-3 py-2 flex items-center gap-2 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
              <View className="i-lucide-map-pin w-4 h-4 text-champagne-gold" />
              <Text className="text-muted-foreground text-xs">{storeInfo.distance}</Text>
            </View>
          </View>
        </View>

        {/* 底部装饰元素 */}
        <View className="absolute bottom-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(to top, #faf9f6, transparent)' }} />
      </View>

      {/* 门店信息卡片 */}
      <View className="px-5 -mt-6 relative z-10">
        <View className="bg-pearl-white rounded-md p-5 border" style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.08)', borderColor: 'rgba(139,115,85,0.4)' }}>
          {/* 特色服务标签 */}
          <ScrollView scrollX className="mb-4 pb-2" showScrollbar={false}>
            <View className="flex gap-2">
              {featureTags.map((tag, index) => (
                <View key={index} className="flex items-center gap-2 rounded-sm px-3 py-2 flex-shrink-0" style={{ backgroundColor: 'rgba(240,236,228,0.6)' }}>
                  <View className={`${tag.icon} w-4 h-4 text-champagne-gold`} />
                  <Text className="text-obsidian-black text-xs">{tag.text}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* 营业时间和地址 */}
          <View className="space-y-3">
            <View className="flex items-start gap-3 p-3 rounded-sm" style={{ backgroundColor: 'rgba(240,236,228,0.3)' }}>
              <View className="i-lucide-clock w-4 h-4 text-champagne-gold mt-0.5 flex-shrink-0" />
              <View>
                <Text className="text-obsidian-black text-sm font-serif">营业时间</Text>
                <Text className="text-muted-foreground text-xs mt-1">{storeInfo.businessHours}</Text>
              </View>
            </View>

            <View className="flex items-start gap-3 p-3 rounded-sm" style={{ backgroundColor: 'rgba(240,236,228,0.3)' }}>
              <View className="i-lucide-navigation w-4 h-4 text-champagne-gold mt-0.5 flex-shrink-0" />
              <View>
                <Text className="text-obsidian-black text-sm font-serif">门店地址</Text>
                <Text className="text-muted-foreground text-xs mt-1 leading-relaxed">{storeInfo.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 热门服务预览 - 双排网格 */}
      <View className="px-5 mt-6">
        <View className="flex items-center justify-between mb-4">
          <Text className="text-obsidian-black text-lg font-serif tracking-wide">热门服务</Text>
          <View className="flex items-center gap-1">
            <Text className="text-champagne-gold text-sm">查看全部</Text>
            <View className="i-lucide-chevron-right w-4 h-4 text-champagne-gold" />
          </View>
        </View>

        <View className="grid grid-cols-2 gap-3">
          {hotServices.map((service, index) => (
            <View key={index} className="relative rounded-md overflow-hidden border active:scale-[0.97]" style={{ borderColor: 'rgba(139,115,85,0.3)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <Image
                className="w-full h-32 object-cover"
                src={service.image}
                mode="aspectFill"
              />
              <View className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                <Text className="text-white text-sm font-medium">{service.name}</Text>
                <Text className="text-champagne-gold text-xs mt-1">{service.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 立即预约按钮 */}
      <View className="px-5 mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <View
          className="relative bg-obsidian-black rounded-md py-4 flex items-center justify-center active:scale-[0.98] transition-all duration-300"
          style={{ borderColor: 'rgba(201,169,110,0.5)', borderWidth: 1, boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
          onClick={onBookNow}
        >
          <View className="flex items-center gap-2">
            <View className="i-lucide-calendar w-4 h-4 text-champagne-gold" />
            <Text className="text-champagne-gold font-serif text-base tracking-[0.2em] uppercase font-medium">
              立即预约
            </Text>
          </View>
        </View>
      </View>

      {/* 底部装饰区域 */}
      <View className="mt-8 px-8">
        <View className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)' }} />
        <View className="flex justify-center mt-4 gap-6">
          <View className="flex flex-col items-center gap-1">
            <View className="i-lucide-shield-check w-5 h-5" style={{ color: 'rgba(201,169,110,0.6)' }} />
            <Text className="text-muted-foreground text-[10px]">安全保障</Text>
          </View>
          <View className="flex flex-col items-center gap-1">
            <View className="i-lucide-award w-5 h-5" style={{ color: 'rgba(201,169,110,0.6)' }} />
            <Text className="text-muted-foreground text-[10px]">品质认证</Text>
          </View>
          <View className="flex flex-col items-center gap-1">
            <View className="i-lucide-heart w-5 h-5" style={{ color: 'rgba(201,169,110,0.6)' }} />
            <Text className="text-muted-foreground text-[10px]">贴心服务</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
