import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import type { ReservationConfirmProps } from '@/types';

export default function ReservationConfirm({ reservation, onBackToHome }: ReservationConfirmProps) {
  const handleViewLocation = () => {
    Taro.openLocation({
      latitude: 31.2276,
      longitude: 121.4540,
      name: 'LUMIÈRE 美学沙龙',
      address: reservation.address,
      scale: 16
    });
  };

  const handleAddToCalendar = () => {
    Taro.showToast({
      title: '请在手机日历中手动添加',
      icon: 'none',
      duration: 2000
    });
  };

  const handleBackToHome = () => {
    Taro.switchTab({ url: '/pages/index/index' });
  };
  return (
    <View className="min-h-screen bg-obsidian-black flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <View className="absolute top-0 left-0 w-full h-full opacity-10">
        <View className="absolute top-10 left-10 w-32 h-32 rounded-full" style={{ backgroundColor: '#c9a96e', filter: 'blur(40px)' }} />
        <View className="absolute bottom-10 right-10 w-40 h-40 rounded-full" style={{ backgroundColor: 'rgba(201, 169, 110, 0.5)', filter: 'blur(40px)' }} />
      </View>

      {/* 成功动画图标 */}
      <View className="mb-6 animate-scale-in">
        <View className="relative">
          <View className="w-20 h-20 rounded-full flex items-center justify-center border-2" style={{ backgroundColor: 'rgba(201, 169, 110, 0.2)', borderColor: 'rgba(201, 169, 110, 0.4)' }}>
            <View className="i-lucide-check-circle w-10 h-10 text-champagne-gold" />
          </View>
          {/* 脉冲效果 */}
          <View className="absolute inset-0 w-20 h-20 rounded-full animate-ping" style={{ backgroundColor: 'rgba(201, 169, 110, 0.1)' }} />
        </View>
      </View>

      {/* 预约确认卡 - 高端邀请函风格 */}
      <View
        className="w-full max-w-sm rounded-xl overflow-hidden animate-scale-in relative"
        style={{
          background: 'linear-gradient(135deg, #faf9f6 0%, #f8f6f3 30%, #f0ece4 70%, #e8d5a8 100%)',
          boxShadow: '0 8px 40px rgba(201, 169, 110, 0.4), 0 0 0 1px rgba(201, 169, 110, 0.2)',
          border: '1px solid rgba(201, 169, 110, 0.6)'
        }}
      >
        {/* 卡片顶部装饰条 */}
        <View className="h-2 w-full" style={{ background: 'linear-gradient(to right, rgba(201, 169, 110, 0.6), #c9a96e, rgba(201, 169, 110, 0.6))' }} />

        {/* 卡片顶部 - 标题 */}
        <View className="bg-obsidian-black px-6 py-5 text-center relative overflow-hidden">
          {/* 背景光泽效果 */}
          <View className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(201, 169, 110, 0.1), transparent)' }} />

          <View className="relative">
            <View className="flex items-center justify-center gap-2 mb-2">
              <View className="i-lucide-crown w-5 h-5 text-champagne-gold" />
              <Text className="text-champagne-gold font-serif text-lg tracking-[0.2em] font-medium">
                预约已确认
              </Text>
              <View className="i-lucide-crown w-5 h-5 text-champagne-gold" />
            </View>
            <Text className="text-champagne-gold/60 font-serif text-xs tracking-[0.25em] block">
              RESERVATION CONFIRMED
            </Text>
          </View>
        </View>

        {/* 金色分隔线 */}
        <View className="h-px w-full relative" style={{ background: 'linear-gradient(to right, transparent, #c9a96e, transparent)' }}>
          <View className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-champagne-gold rounded-full" />
        </View>

        {/* 卡片内容 */}
        <View className="px-6 py-6 space-y-4">
          {/* 服务信息区域 */}
          <View className="rounded-lg p-4 border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(201, 169, 110, 0.2)' }}>
            <View className="flex items-center gap-2 mb-3">
              <View className="i-lucide-sparkles w-4 h-4 text-champagne-gold" />
              <Text className="text-obsidian-black font-serif text-sm font-medium">服务详情</Text>
            </View>

            {/* 服务项目 */}
            <View className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid rgba(201, 169, 110, 0.1)' }}>
              <Text className="text-muted-foreground text-xs tracking-wide">服务项目</Text>
              <Text className="text-obsidian-black font-serif text-sm font-medium">{reservation.serviceName}</Text>
            </View>

            {/* 技师 */}
            <View className="flex justify-between items-center pt-2">
              <Text className="text-muted-foreground text-xs tracking-wide">专属技师</Text>
              <Text className="text-obsidian-black font-serif text-sm">{reservation.staffName}</Text>
            </View>
          </View>

          {/* 时间信息区域 */}
          <View className="rounded-lg p-4 border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(201, 169, 110, 0.2)' }}>
            <View className="flex items-center gap-2 mb-3">
              <View className="i-lucide-calendar w-4 h-4 text-champagne-gold" />
              <Text className="text-obsidian-black font-serif text-sm font-medium">预约时间</Text>
            </View>

            <View className="flex justify-between items-center">
              <Text className="text-muted-foreground text-xs tracking-wide">日期时间</Text>
              <Text className="text-obsidian-black font-serif text-sm font-medium">
                {reservation.date} {reservation.time}
              </Text>
            </View>
          </View>

          {/* 地址信息区域 */}
          <View className="rounded-lg p-4 border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(201, 169, 110, 0.2)' }}>
            <View className="flex items-center gap-2 mb-3">
              <View className="i-lucide-map-pin w-4 h-4 text-champagne-gold" />
              <Text className="text-obsidian-black font-serif text-sm font-medium">门店信息</Text>
            </View>

            <View className="pb-2">
              <Text className="text-muted-foreground text-xs tracking-wide block mb-1">门店地址</Text>
              <Text className="text-obsidian-black font-serif text-sm leading-relaxed">
                {reservation.address}
              </Text>
            </View>
          </View>

          {/* 用户信息区域 */}
          <View className="rounded-lg p-4 border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(201, 169, 110, 0.2)' }}>
            <View className="flex items-center gap-2 mb-3">
              <View className="i-lucide-user w-4 h-4 text-champagne-gold" />
              <Text className="text-obsidian-black font-serif text-sm font-medium">预约人信息</Text>
            </View>

            <View className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid rgba(201, 169, 110, 0.1)' }}>
              <Text className="text-muted-foreground text-xs tracking-wide">预约人</Text>
              <Text className="text-obsidian-black font-serif text-sm">{reservation.userName}</Text>
            </View>

            <View className="flex justify-between items-center pt-2">
              <Text className="text-muted-foreground text-xs tracking-wide">联系电话</Text>
              <Text className="text-obsidian-black font-serif text-sm">{reservation.phone}</Text>
            </View>
          </View>

          {/* 预约编号 */}
          <View className="rounded-lg p-4 border" style={{ backgroundColor: 'rgba(201, 169, 110, 0.1)', borderColor: 'rgba(201, 169, 110, 0.3)' }}>
            <View className="flex items-center gap-2 mb-2">
              <View className="i-lucide-hash w-4 h-4 text-champagne-gold" />
              <Text className="text-muted-foreground text-xs tracking-wide">预约编号</Text>
            </View>
            <Text className="text-champagne-gold font-serif text-base tracking-[0.15em] font-medium text-center">
              {reservation.reservationNo}
            </Text>
          </View>
        </View>

        {/* 底部装饰线 */}
        <View className="h-px w-full relative" style={{ background: 'linear-gradient(to right, transparent, #c9a96e, transparent)' }}>
          <View className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-champagne-gold rounded-full" />
        </View>

        {/* 底部品牌标识 */}
        <View className="bg-obsidian-black px-6 py-3 text-center">
          <Text className="text-champagne-gold/60 font-serif text-xs tracking-[0.2em]">
            LUMIÈRE 美学沙龙
          </Text>
        </View>
      </View>

      {/* 操作按钮 */}
      <View className="mt-8 w-full max-w-sm space-y-3">
        <View
          className="w-full py-4 rounded-lg flex items-center justify-center relative overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
            border: '1px solid rgba(201, 169, 110, 0.5)'
          }}
          onClick={() => {}}
        >
          {/* 按钮光泽效果 */}
          <View className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(201, 169, 110, 0.1), transparent)', opacity: 0 }} />

          <View className="flex items-center gap-2">
            <View className="i-lucide-map w-4 h-4 text-champagne-gold" />
            <Text className="text-champagne-gold text-sm tracking-wide font-medium">查看门店位置</Text>
          </View>
        </View>

        <View
          className="w-full py-4 rounded-lg flex items-center justify-center relative overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
            border: '1px solid rgba(201, 169, 110, 0.5)'
          }}
          onClick={() => {}}
        >
          {/* 按钮光泽效果 */}
          <View className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(201, 169, 110, 0.1), transparent)', opacity: 0 }} />

          <View className="flex items-center gap-2">
            <View className="i-lucide-calendar-plus w-4 h-4 text-champagne-gold" />
            <Text className="text-champagne-gold text-sm tracking-wide font-medium">添加到日历</Text>
          </View>
        </View>

        <View
          className="w-full py-4 rounded-lg flex items-center justify-center relative overflow-hidden transition-all duration-300"
          style={{
            background: 'transparent',
            border: '1px solid rgba(201, 169, 110, 0.6)'
          }}
          onClick={onBackToHome}
        >
          <View className="flex items-center gap-2">
            <View className="i-lucide-home w-4 h-4 text-champagne-gold" />
            <Text className="text-champagne-gold text-sm tracking-wide font-medium">返回首页</Text>
          </View>
        </View>
      </View>

      {/* 底部提示 */}
      <View className="mt-6 text-center">
        <Text className="text-champagne-gold/40 text-xs tracking-wide">
          请准时到店，我们将为您预留专属服务
        </Text>
      </View>
    </View>
  );
}
