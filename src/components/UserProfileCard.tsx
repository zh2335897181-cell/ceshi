import { View, Text, Image } from '@tarojs/components';
import type { UserProfile } from '@/types';

interface UserProfileCardProps {
  profile: UserProfile;
}

export default function UserProfileCard({ profile }: UserProfileCardProps) {
  return (
    <View className="bg-card rounded-lg p-5 border" style={{ borderColor: 'rgba(201, 169, 110, 0.3)' }}>
      <View className="flex items-center gap-4">
        {/* 头像 */}
        <View className="relative">
          <Image
            src={profile.avatar}
            mode="aspectFill"
            className="w-16 h-16 rounded-full border-2"
            style={{ borderColor: 'rgba(201, 169, 110, 0.5)' }}
          />
          {/* 会员等级标识 */}
          <View
            className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full"
            style={{ backgroundColor: '#c9a96e' }}
          >
            <Text className="text-obsidian-black text-[10px] font-medium">{profile.memberLevel}</Text>
          </View>
        </View>

        {/* 用户信息 */}
        <View className="flex-1">
          <Text className="font-serif text-obsidian-black text-lg font-medium">{profile.name}</Text>
          <Text className="text-muted-foreground text-xs mt-1 block">{profile.phone}</Text>
        </View>
      </View>

      {/* 积分和优惠券 */}
      <View className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(201, 169, 110, 0.2)' }}>
        <View className="flex justify-around">
          <View className="text-center">
            <Text className="font-serif text-champagne-gold text-xl font-medium">{profile.points}</Text>
            <Text className="text-muted-foreground text-xs mt-1 block">积分</Text>
          </View>
          <View className="w-px bg-border" style={{ backgroundColor: 'rgba(201, 169, 110, 0.2)' }} />
          <View className="text-center">
            <Text className="font-serif text-champagne-gold text-xl font-medium">{profile.coupons}</Text>
            <Text className="text-muted-foreground text-xs mt-1 block">优惠券</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
