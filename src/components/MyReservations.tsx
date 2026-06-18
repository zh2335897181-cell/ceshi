import { View, Text } from '@tarojs/components';
import type { MyReservationsProps, ReservationRecord } from '@/types';

const statusText = {
  pending: '待到店',
  completed: '已完成',
  cancelled: '已取消'
};

const statusColor = {
  pending: '#c9a96e',
  completed: '#4ade80',
  cancelled: '#9ca3af'
};

export default function MyReservations({ reservations, onViewDetail }: MyReservationsProps) {
  if (reservations.length === 0) {
    return (
      <View className="flex flex-col items-center justify-center py-12">
        <View className="i-lucide-calendar-x w-12 h-12 text-muted-foreground/50 mb-3" />
        <Text className="text-muted-foreground text-sm">暂无预约记录</Text>
      </View>
    );
  }

  return (
    <View className="space-y-3">
      {reservations.map((item) => (
        <View
          key={item.id}
          className="bg-card rounded-lg p-4 border border-warm-gray/30 active:scale-[0.98] transition-all duration-200"
          onClick={() => onViewDetail(item)}
        >
          <View className="flex items-start justify-between mb-3">
            <View>
              <Text className="text-obsidian-black font-serif text-base font-medium">{item.serviceName}</Text>
              <Text className="text-muted-foreground text-xs mt-1">技师：{item.staffName}</Text>
            </View>
            <View
              className="rounded-sm px-2 py-1"
              style={{ backgroundColor: `${statusColor[item.status]}20` }}
            >
              <Text className="text-xs" style={{ color: statusColor[item.status] }}>
                {statusText[item.status]}
              </Text>
            </View>
          </View>

          <View className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
            <View className="flex items-center gap-1">
              <View className="i-lucide-calendar w-3 h-3" />
              <Text>{item.date}</Text>
            </View>
            <View className="flex items-center gap-1">
              <View className="i-lucide-clock w-3 h-3" />
              <Text>{item.time}</Text>
            </View>
          </View>

          <View className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(139, 115, 85, 0.2)' }}>
            <Text className="text-xs text-muted-foreground">预约号：{item.reservationNo}</Text>
            <View className="flex items-center gap-1">
              <Text className="text-champagne-gold text-xs">查看详情</Text>
              <View className="i-lucide-chevron-right w-3 h-3 text-champagne-gold" />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
