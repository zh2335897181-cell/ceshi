import { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';

const menuItems = [
  { icon: 'i-lucide-calendar', label: '我的预约', action: () => Taro.showToast({ title: '功能开发中', icon: 'none' }) },
  { icon: 'i-lucide-id-card', label: '会员信息', action: () => Taro.showToast({ title: '功能开发中', icon: 'none' }) },
  { icon: 'i-lucide-ticket', label: '优惠券/次卡', action: () => Taro.showToast({ title: '功能开发中', icon: 'none' }) },
  { icon: 'i-lucide-users', label: '常用联系人', action: () => Taro.showToast({ title: '功能开发中', icon: 'none' }) },
  { icon: 'i-lucide-star', label: '我的评价', action: () => Taro.showToast({ title: '功能开发中', icon: 'none' }) },
  { icon: 'i-lucide-headphones', label: '联系客服', action: async () => {
    const env = Taro.getEnv();
    if (env === Taro.ENV_TYPE.WEAPP) {
      await Taro.makePhoneCall({ phoneNumber: '400-888-8888' });
    } else {
      Taro.showToast({ title: '请在微信小程序中拨打客服电话', icon: 'none' });
    }
  } },
  { icon: 'i-lucide-map-pin', label: '门店地址', action: async () => {
    const env = Taro.getEnv();
    if (env === Taro.ENV_TYPE.WEAPP) {
      await Taro.openLocation({
        latitude: 31.227,
        longitude: 121.456,
        name: 'LUMIÈRE 美学沙龙',
        address: '上海市静安区南京西路1266号恒隆广场3层'
      });
    } else {
      Taro.showToast({ title: '请在微信小程序中打开以查看地图', icon: 'none' });
    }
  } },
  { icon: 'i-lucide-shield', label: '管理后台', action: () => Taro.navigateTo({ url: '/pages/admin/index' }) },
  { icon: 'i-lucide-settings', label: '设置', action: () => Taro.showToast({ title: '功能开发中', icon: 'none' }) }
];

const mockReservations = [
  { id: '1', serviceName: '鎏金焕肤护理', staffName: '林雅婷', date: '2026-06-20', time: '14:00', status: 'pending' as const, reservationNo: 'RES12345678', createdAt: '2026-06-18' },
  { id: '2', serviceName: '珍珠光感美甲', staffName: '陈思琪', date: '2026-06-15', time: '10:30', status: 'completed' as const, reservationNo: 'RES12345679', createdAt: '2026-06-13' },
  { id: '3', serviceName: '高定眉睫设计', staffName: '张雨萱', date: '2026-06-10', time: '15:00', status: 'cancelled' as const, reservationNo: 'RES12345680', createdAt: '2026-06-08' }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'cancelled'>('pending');

  const filteredReservations = mockReservations.filter(r => r.status === activeTab);

  return (
    <View className="min-h-screen bg-background">
      {/* 用户信息卡片 */}
      <View className="px-6 pt-12 pb-6" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)' }}>
        <View className="flex items-center gap-4">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face"
            className="w-16 h-16 rounded-full border-2"
            style={{ borderColor: '#c9a96e' }}
            mode="aspectFill"
          />
          <View className="flex-1">
            <Text className="text-pearl-white text-lg font-serif font-medium">张女士</Text>
            <Text className="text-champagne-gold text-xs mt-1 block">钻石会员</Text>
          </View>
          <View className="flex flex-col items-end">
            <Text className="text-champagne-gold text-xl font-serif">2,680</Text>
            <Text className="text-muted-foreground text-xs">积分</Text>
          </View>
        </View>

        <View className="mt-4 flex gap-3">
          <View className="flex-1 rounded-sm p-3" style={{ backgroundColor: 'rgba(201, 169, 110, 0.1)' }}>
            <Text className="text-champagne-gold text-lg font-serif">3</Text>
            <Text className="text-muted-foreground text-xs block mt-1">优惠券</Text>
          </View>
          <View className="flex-1 rounded-sm p-3" style={{ backgroundColor: 'rgba(201, 169, 110, 0.1)' }}>
            <Text className="text-champagne-gold text-lg font-serif">2</Text>
            <Text className="text-muted-foreground text-xs block mt-1">次卡</Text>
          </View>
        </View>
      </View>

      {/* 我的预约 */}
      <View className="px-4 py-4">
        <View className="flex items-center justify-between mb-3">
          <Text className="text-obsidian-black text-base font-serif font-medium">我的预约</Text>
          <Text className="text-champagne-gold text-xs">查看全部</Text>
        </View>

        <View className="flex gap-2 mb-3">
          {[
            { key: 'pending', label: '待到店' },
            { key: 'completed', label: '已完成' },
            { key: 'cancelled', label: '已取消' }
          ].map(tab => (
            <View
              key={tab.key}
              className="flex-1 py-2 text-center rounded-sm text-xs transition-all"
              style={{
                backgroundColor: activeTab === tab.key ? '#c9a96e' : 'rgba(240, 236, 228, 0.5)',
                color: activeTab === tab.key ? '#1a1a1a' : '#8b7355'
              }}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </View>
          ))}
        </View>

        {filteredReservations.length === 0 ? (
          <View className="py-8 text-center">
            <Text className="text-muted-foreground text-sm">暂无预约记录</Text>
          </View>
        ) : (
          <View className="space-y-3">
            {filteredReservations.map(item => (
              <View
                key={item.id}
                className="rounded-lg p-4 border"
                style={{ backgroundColor: '#faf9f6', borderColor: 'rgba(201, 169, 110, 0.3)' }}
              >
                <View className="flex justify-between items-start mb-2">
                  <Text className="text-obsidian-black text-sm font-medium">{item.serviceName}</Text>
                  <Text className="text-xs px-2 py-0.5 rounded-sm" style={{
                    backgroundColor: item.status === 'pending' ? 'rgba(201, 169, 110, 0.2)' : item.status === 'completed' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(158, 158, 158, 0.2)',
                    color: item.status === 'pending' ? '#c9a96e' : item.status === 'completed' ? '#4caf50' : '#9e9e9e'
                  }}>
                    {item.status === 'pending' ? '待到店' : item.status === 'completed' ? '已完成' : '已取消'}
                  </Text>
                </View>
                <Text className="text-muted-foreground text-xs">技师：{item.staffName}</Text>
                <Text className="text-muted-foreground text-xs mt-1">时间：{item.date} {item.time}</Text>
                <Text className="text-champagne-gold text-xs mt-2">编号：{item.reservationNo}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* 功能菜单 */}
      <View className="px-4 py-4">
        <View className="bg-pearl-white rounded-lg overflow-hidden border" style={{ borderColor: 'rgba(201, 169, 110, 0.3)' }}>
          {menuItems.map((item, index) => (
            <View
              key={index}
              className="flex items-center justify-between px-4 py-3 active:opacity-70"
              style={{ borderBottom: index < menuItems.length - 1 ? '1px solid rgba(201, 169, 110, 0.2)' : 'none' }}
              onClick={item.action}
            >
              <View className="flex items-center gap-3">
                <View className={`${item.icon} w-5 h-5 text-champagne-gold`} />
                <Text className="text-obsidian-black text-sm">{item.label}</Text>
              </View>
              <View className="i-lucide-chevron-right w-4 h-4 text-muted-foreground" />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
