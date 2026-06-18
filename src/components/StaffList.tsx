import { View, Text, Image, ScrollView } from '@tarojs/components';
import type { StaffListProps } from '@/types';

// 技师专长图标映射
const specialtyIcons = {
  '面部护理': 'i-lucide-smile',
  'SPA': 'i-lucide-flower-2',
  '美甲': 'i-lucide-hand-metal',
  '手足护理': 'i-lucide-shoe',
  '剪发': 'i-lucide-scissors',
  '染发': 'i-lucide-palette',
  '造型': 'i-lucide-magic',
  '眉毛': 'i-lucide-eye',
  '睫毛': 'i-lucide-eye',
  '纹绣': 'i-lucide-pen-tool'
};

export default function StaffList({ staff, selectedStaffId, onSelectStaff }: StaffListProps) {
  return (
    <View className="min-h-screen bg-background pb-20">
      {/* 顶部标题 */}
      <View className="px-6 pt-12 pb-6">
        <View className="flex items-center gap-3 mb-2">
          <View className="i-lucide-users w-6 h-6 text-champagne-gold" />
          <Text className="font-serif text-obsidian-black text-2xl tracking-wide font-medium">选择您的专属顾问</Text>
        </View>
        <Text className="text-muted-foreground text-sm block">专业团队，为您定制个性化服务</Text>

        {/* 统计信息 */}
        <View className="flex gap-4 mt-4">
          <View className="rounded-sm px-3 py-2 flex-1" style={{ backgroundColor: 'rgba(240, 236, 228, 0.5)' }}>
            <Text className="text-champagne-gold text-lg font-serif font-medium">{staff.length}</Text>
            <Text className="text-muted-foreground text-xs">专业技师</Text>
          </View>
          <View className="rounded-sm px-3 py-2 flex-1" style={{ backgroundColor: 'rgba(240, 236, 228, 0.5)' }}>
            <Text className="text-champagne-gold text-lg font-serif font-medium">4.8+</Text>
            <Text className="text-muted-foreground text-xs">平均评分</Text>
          </View>
        </View>
      </View>

      {/* 技师卡片列表 */}
      <View className="px-4 space-y-4">
        {staff.map((member) => {
          const isSelected = selectedStaffId === member.id;

          return (
              <View
                key={member.id}
                className="relative bg-card rounded-lg p-5 transition-all duration-200 active:scale-[0.98]"
                style={{
                  border: isSelected ? '2px solid #c9a96e' : '1px solid rgba(139, 115, 85, 0.3)',
                  boxShadow: isSelected ? '0 4px 20px rgba(201, 169, 110, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                onClick={() => onSelectStaff(member)}
              >
              {/* 选中标识 */}
              {isSelected && (
                <View className="absolute top-3 right-3">
                  <View className="bg-champagne-gold rounded-full p-2 shadow-md">
                    <View className="i-lucide-check w-4 h-4 text-obsidian-black" />
                  </View>
                </View>
              )}

              <View className="flex gap-5">
                {/* 头像 */}
                <View className="shrink-0 relative">
                  <View className="relative rounded-lg overflow-hidden border-2" style={{ borderColor: isSelected ? '#c9a96e' : 'rgba(139, 115, 85, 0.3)' }}>
                    <Image
                      src={member.avatar}
                      mode="aspectFill"
                      className="w-24 h-24 object-cover"
                    />
                    {/* 头像遮罩效果 */}
                    <View className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)' }} />
                  </View>

                  {/* 在线状态指示器 */}
                  <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                </View>

                {/* 信息区域 */}
                <View className="flex-1 min-w-0">
                  <View className="flex items-start justify-between mb-3">
                    <View>
                      <Text className="font-serif text-obsidian-black text-lg font-medium">{member.name}</Text>
                      <Text className="text-muted-foreground text-xs mt-1">{member.title}</Text>
                    </View>
                    <View className="flex items-center gap-1 rounded-sm px-2 py-1" style={{ backgroundColor: 'rgba(240, 236, 228, 0.6)' }}>
                      <View className="i-lucide-star w-4 h-4 text-champagne-gold fill-current" />
                      <Text className="text-xs text-obsidian-black font-medium">{member.rating}</Text>
                    </View>
                  </View>

                  {/* 擅长项目 */}
                  <ScrollView scrollX className="mb-3 pb-1" showScrollbar={false}>
                    <View className="flex gap-2">
                      {member.specialties.map((spec, idx) => {
                        const IconClass = specialtyIcons[spec] || 'i-lucide-sparkles';
                        return (
                          <View
                            key={idx}
                            className="flex items-center gap-1 rounded-sm px-2 py-1 flex-shrink-0"
                            style={{ backgroundColor: 'rgba(240, 236, 228, 0.6)' }}
                          >
                            <View className={`${IconClass} w-3 h-3 text-champagne-gold`} />
                            <Text className="text-[10px] text-obsidian-black">{spec}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>

                  {/* 统计信息 */}
                  <View className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <View className="flex items-center gap-1">
                      <View className="i-lucide-calendar w-3 h-3" style={{ color: 'rgba(201, 169, 110, 0.7)' }} />
                      <Text>{member.yearsOfExperience}年经验</Text>
                    </View>
                    <View className="flex items-center gap-1">
                      <View className="i-lucide-users w-3 h-3" style={{ color: 'rgba(201, 169, 110, 0.7)' }} />
                      <Text>服务{member.serviceCount}+人次</Text>
                    </View>
                  </View>

                  {/* 评价关键词 */}
                  <View className="flex flex-wrap gap-2">
                    {member.keywords.map((keyword, idx) => (
                      <View
                        key={idx}
                        className="rounded-sm px-2 py-1"
                        style={{ backgroundColor: 'rgba(201, 169, 110, 0.1)' }}
                      >
                        <Text className="text-[10px] text-champagne-gold">#{keyword}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* 底部提示 */}
      <View className="fixed bottom-0 left-0 right-0 px-6 py-4" style={{ background: 'linear-gradient(to top, #faf9f6, rgba(250, 249, 246, 0.95))' }}>
        <View className="flex items-center justify-center gap-2">
          <View className="i-lucide-hand-metal w-4 h-4 text-champagne-gold" />
          <Text className="text-center text-xs text-muted-foreground">点击卡片选择您的专属顾问</Text>
        </View>
      </View>
    </View>
  );
}
