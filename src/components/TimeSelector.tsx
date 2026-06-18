import { View, Text, ScrollView } from '@tarojs/components';
import type { TimeSelectorProps } from '@/types';

const timePeriodIcons = {
  morning: 'i-lucide-sunrise',
  afternoon: 'i-lucide-sun',
  evening: 'i-lucide-moon'
};

export default function TimeSelector({
  dates,
  selectedDate,
  timeSlots,
  selectedTime,
  onSelectDate,
  onSelectTime
}: TimeSelectorProps) {
  const getTimePeriod = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <View className="min-h-screen bg-background px-4 py-6">
      <View className="mb-6">
        <View className="flex items-center gap-3 mb-2">
          <View className="i-lucide-calendar-clock w-6 h-6 text-champagne-gold" />
          <Text className="text-foreground text-xl font-serif tracking-wide font-medium">选择预约时间</Text>
        </View>
        <Text className="text-muted-foreground text-sm block">请选择您方便的日期和时间段</Text>

        {selectedDate && (
          <View className="mt-3 rounded-sm px-3 py-2 flex items-center gap-2" style={{ backgroundColor: 'rgba(248, 246, 243, 0.5)' }}>
            <View className="i-lucide-check-circle w-4 h-4 text-champagne-gold" />
            <Text className="text-obsidian-black text-xs">已选日期: {dates.find(d => d.date === selectedDate)?.dayOfWeek} {selectedDate?.slice(-2)}日</Text>
          </View>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-foreground text-base font-serif mb-3 block">选择日期</Text>
        <ScrollView scrollX className="pb-2" showScrollbar={false}>
          <View className="flex gap-3">
            {dates.map((date) => {
              const isSelected = selectedDate === date.date;
              const isAvailable = date.available;
              const isToday = date.dayOfWeek === '今天';

              return (
                <View
                  key={date.date}
                  className="relative flex-shrink-0 w-20 h-24 rounded-lg border-2 transition-all duration-300 flex flex-col items-center justify-center active:scale-95"
                  style={{
                    backgroundColor: isSelected ? '#1a1a1a' : isAvailable ? '#faf9f6' : '#f5f5f5',
                    borderColor: isSelected ? '#c9a96e' : isAvailable ? 'rgba(139, 115, 85, 0.5)' : 'rgba(139, 115, 85, 0.3)',
                    opacity: isAvailable ? 1 : 0.5,
                    boxShadow: isSelected ? '0 4px 15px rgba(201, 169, 110, 0.4)' : 'none'
                  }}
                  onClick={() => isAvailable && onSelectDate(date.date)}
                >
                  {isToday && (
                    <View className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <View className="bg-champagne-gold rounded-full px-2 py-0.5">
                        <Text className="text-obsidian-black text-[8px] font-medium">今日</Text>
                      </View>
                    </View>
                  )}

                  <Text className={`text-xs mb-1 ${isSelected ? 'text-champagne-gold' : 'text-muted-foreground'}`}>
                    {date.dayOfWeek}
                  </Text>
                  <Text className={`text-xl font-serif font-medium ${isSelected ? 'text-pearl-white' : 'text-foreground'}`}>
                    {date.date.slice(-2)}
                  </Text>

                  {isAvailable ? (
                    <View className="mt-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                  ) : (
                    <Text className="text-[9px] text-muted-foreground mt-1">已满</Text>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {selectedDate && (
        <View className="animate-fade-in-up">
          <View className="flex items-center justify-between mb-4">
            <Text className="text-foreground text-base font-serif">可选时段</Text>
            <View className="flex items-center gap-2">
              <View className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <Text className="text-muted-foreground text-xs">可预约</Text>
              <View className="w-2 h-2 rounded-full ml-2" style={{ backgroundColor: '#d1d5db' }} />
              <Text className="text-muted-foreground text-xs">已满</Text>
            </View>
          </View>

          <View className="space-y-4">
            {['morning', 'afternoon', 'evening'].map((period) => {
              const periodSlots = timeSlots.filter(slot => getTimePeriod(slot.time) === period);
              if (periodSlots.length === 0) return null;

              const periodIcon = timePeriodIcons[period as keyof typeof timePeriodIcons];
              const periodName = period === 'morning' ? '上午' : period === 'afternoon' ? '下午' : '晚上';

              return (
                <View key={period}>
                  <View className="flex items-center gap-2 mb-2">
                    <View className={`${periodIcon} w-4 h-4 text-champagne-gold`} />
                    <Text className="text-muted-foreground text-sm">{periodName}</Text>
                  </View>

                  <View className="grid grid-cols-3 gap-3">
                    {periodSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      const isAvailable = slot.available;

                      return (
                        <View
                          key={slot.time}
                          className="relative h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 active:scale-95"
                          style={{
                            backgroundColor: isSelected ? '#c9a96e' : isAvailable ? '#faf9f6' : '#f5f5f5',
                            borderColor: isSelected ? '#c9a96e' : isAvailable ? 'rgba(139, 115, 85, 0.5)' : 'rgba(139, 115, 85, 0.3)',
                            opacity: isAvailable ? 1 : 0.4,
                            boxShadow: isSelected ? '0 4px 15px rgba(201, 169, 110, 0.4)' : 'none'
                          }}
                          onClick={() => isAvailable && onSelectTime(slot.time)}
                        >
                          <Text className={`text-sm font-medium ${isSelected ? 'text-obsidian-black' : isAvailable ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {slot.time}
                          </Text>

                          {isSelected && (
                            <View className="absolute -top-1 -right-1 w-4 h-4 bg-obsidian-black rounded-full flex items-center justify-center">
                              <View className="i-lucide-check w-3 h-3 text-champagne-gold" />
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {!selectedDate && (
        <View className="mt-12 flex flex-col items-center justify-center">
          <View className="i-lucide-calendar w-12 h-12 text-champagne-gold/40 mb-3" />
          <Text className="text-muted-foreground text-sm">请先选择日期</Text>
        </View>
      )}

      <View className="mt-8 px-8">
        <View className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201, 169, 110, 0.3), transparent)' }} />
      </View>
    </View>
  );
}
