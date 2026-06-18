import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import type { ServiceListProps } from '@/types';

// 服务分类标签
const serviceCategories = [
  { id: 'all', name: '全部' },
  { id: 'facial', name: '面部护理' },
  { id: 'nail', name: '美甲美睫' },
  { id: 'spa', name: 'SPA放松' },
  { id: 'hair', name: '发型设计' }
];

export default function ServiceList({ services, onSelectService }: ServiceListProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  // 根据分类筛选服务
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <View className="min-h-screen bg-background">
      {/* 顶部标题和分类 */}
      <View className="sticky top-0 z-10" style={{ backgroundColor: 'rgba(250, 249, 246, 0.95)' }}>
        <View className="px-4 py-4">
          <Text className="font-serif text-2xl text-foreground tracking-wide font-medium">精选服务</Text>
          <Text className="text-muted-foreground text-sm mt-1 block">为您精心挑选的高品质服务项目</Text>
        </View>

        {/* 分类标签滚动 */}
        <ScrollView scrollX className="pb-2" showScrollbar={false}>
          <View className="flex gap-2 px-4">
            {serviceCategories.map((category) => (
              <View
                key={category.id}
                className={`px-4 py-2 rounded-sm text-sm flex-shrink-0 transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-obsidian-black text-champagne-gold border'
                    : 'bg-light-beige/50 text-muted-foreground border'
                }`}
                style={activeCategory === category.id ? { borderColor: 'rgba(201, 169, 110, 0.5)' } : { borderColor: 'rgba(200, 190, 180, 0.3)' }}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 双排网格布局 */}
      <View className="px-3 py-4">
        <View className="grid grid-cols-2 gap-3">
          {filteredServices.map((service, index) => {
            return (
              <View
                key={service.id}
                className="relative h-56 rounded-md overflow-hidden border shadow-sm transition-all duration-300 active:scale-[0.95] active:opacity-90"
                style={{ borderColor: 'rgba(201, 169, 110, 0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}
                onClick={() => {
                  Taro.showToast({ title: `已选择：${service.name}`, icon: 'success', duration: 1500 });
                  onSelectService(service);
                }}
              >
                {/* 服务图片 */}
                <Image
                  src={service.image}
                  mode="aspectFill"
                  className="absolute inset-0 w-full h-full"
                />

                {/* 顶部标签 - 仅保留精选标识 */}
                {index < 2 && (
                  <View className="absolute top-3 left-3">
                    <View style={{ backgroundColor: 'rgba(201, 169, 110, 0.9)' }} className="rounded-sm px-3 py-1">
                      <Text className="text-obsidian-black text-xs font-medium">精选</Text>
                    </View>
                  </View>
                )}

                {/* 底部渐变蒙层 */}
                <View className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.5), transparent)' }}>
                  <Text className="font-serif text-white text-lg tracking-wide mb-2 block font-medium">
                    {service.name}
                  </Text>
                  <Text className="text-base leading-relaxed block mb-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {service.description}
                  </Text>

                  <View className="flex items-center justify-between">
                    <View className="flex items-center gap-2">
                      <Text className="text-[#c9a96e] font-medium text-base">
                        ¥{service.price} 起
                      </Text>
                      <View className="w-px h-4" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                      <Text className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {service.duration}分钟
                      </Text>
                    </View>

                    {/* 预约按钮 */}
                    <View style={{ backgroundColor: 'rgba(201, 169, 110, 0.9)' }} className="rounded-sm px-3 py-1.5">
                      <Text className="text-obsidian-black text-xs font-medium">预约</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {filteredServices.length === 0 && (
          <View className="py-12 text-center">
            <Text className="text-muted-foreground text-sm">该分类下暂无服务</Text>
          </View>
        )}
      </View>

      {/* 底部提示 */}
      <View className="px-6 py-4 text-center">
        <Text className="text-muted-foreground text-sm">点击服务卡片查看详情并预约</Text>
      </View>
    </View>
  );
}
