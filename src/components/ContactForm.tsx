import { View, Text, Input, Switch } from '@tarojs/components';
import type { ContactFormProps } from '@/types';

const fieldIcons = {
  name: 'i-lucide-user',
  phone: 'i-lucide-phone',
  guestCount: 'i-lucide-users',
  wechat: 'i-lucide-message-circle',
  memberNo: 'i-lucide-id-card',
  notes: 'i-lucide-file-text'
};

// 联系信息图标
const contactIcon = 'i-lucide-mail';

export default function ContactForm({ form, onChange, onSubmit }: ContactFormProps) {
  const renderInput = (field: string, label: string, placeholder: string, type = 'text', required = false) => {
    const IconClass = fieldIcons[field as keyof typeof fieldIcons] || 'i-lucide-input';

    return (
      <View>
        <View className="flex items-center gap-2 mb-2">
          <View className={`${IconClass} w-4 h-4 text-champagne-gold`} />
          <Text className="text-obsidian-black text-sm font-medium">
            {label} {required && <Text className="text-champagne-gold">*</Text>}
          </Text>
        </View>
        <View
          className="relative bg-pearl-white border rounded-md p-3"
          style={{ borderColor: 'rgba(180, 170, 150, 0.5)' }}
        >
          <Input
            className="w-full bg-transparent text-obsidian-black text-sm pl-1"
            type={type}
            placeholder={placeholder}
            placeholderClass="text-muted-foreground"
            value={String(form[field as keyof typeof form] || '')}
            onInput={(e) => onChange(field as any, type === 'number' ? (parseInt(e.detail.value) || 0) : e.detail.value)}
          />
        </View>
      </View>
    );
  };

  return (
    <View className="min-h-screen bg-background pb-24">
      <View className="px-6 pt-12 pb-6">
        <View className="flex items-center gap-3 mb-2">
          <View className="i-lucide-file-check w-6 h-6 text-champagne-gold" />
          <Text className="text-obsidian-black text-xl font-serif tracking-wide font-medium">
            完善预约信息
          </Text>
        </View>
        <Text className="text-muted-foreground text-sm block">
          请填写您的联系方式，我们将为您预留服务
        </Text>

        <View className="mt-4 flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <View key={step} className="flex-1 h-1 rounded-full" style={{ backgroundColor: '#f0ece4' }}>
              <View
                className="h-full rounded-full transition-all duration-500"
                style={{ width: step <= 3 ? '100%' : '0%', backgroundColor: '#c9a96e' }}
              />
            </View>
          ))}
        </View>
        <Text className="text-muted-foreground text-xs mt-1 block">步骤 4/4 - 确认信息</Text>
      </View>

      <View className="px-6 space-y-5">
        <View
          className="rounded-lg p-4 border"
          style={{ backgroundColor: 'rgba(240, 236, 228, 0.3)', borderColor: 'rgba(180, 170, 150, 0.3)' }}
        >
          <View className="flex items-center gap-2 mb-4">
            <View className="i-lucide-user-check w-4 h-4 text-champagne-gold" />
            <Text className="text-obsidian-black text-sm font-medium">基本信息</Text>
          </View>

          {renderInput('name', '姓名', '请输入您的姓名', 'text', true)}

          <View className="mt-4">
            {renderInput('phone', '手机号码', '请输入手机号码', 'number', true)}
          </View>
        </View>

        <View
          className="rounded-lg p-4 border"
          style={{ backgroundColor: 'rgba(240, 236, 228, 0.3)', borderColor: 'rgba(180, 170, 150, 0.3)' }}
        >
          <View className="flex items-center gap-2 mb-4">
            <View className="i-lucide-calendar w-4 h-4 text-champagne-gold" />
            <Text className="text-obsidian-black text-sm font-medium">预约详情</Text>
          </View>

          {renderInput('guestCount', '到店人数', '请输入人数', 'number')}

          <View className="mt-4 flex items-center justify-between py-2">
            <View className="flex items-center gap-2">
              <View className="i-lucide-sparkles w-4 h-4 text-champagne-gold" />
              <Text className="text-obsidian-black text-sm">是否首次到店</Text>
            </View>
            <Switch
              checked={form.isFirstVisit}
              color="#c9a96e"
              onChange={(e) => onChange('isFirstVisit', e.detail.value)}
            />
          </View>
        </View>

        <View
          className="rounded-lg p-4 border"
          style={{ backgroundColor: 'rgba(240, 236, 228, 0.3)', borderColor: 'rgba(180, 170, 150, 0.3)' }}
        >
          <View className="flex items-center gap-2 mb-4">
            <View className="i-lucide-mail w-4 h-4 text-champagne-gold" />
            <Text className="text-obsidian-black text-sm font-medium">联系信息（可选）</Text>
          </View>

          {renderInput('wechat', '微信号', '方便我们与您联系')}

          <View className="mt-4">
            {renderInput('memberNo', '会员号', '如有会员号请填写')}
          </View>
        </View>

        <View
          className="rounded-lg p-4 border"
          style={{ backgroundColor: 'rgba(240, 236, 228, 0.3)', borderColor: 'rgba(180, 170, 150, 0.3)' }}
        >
          <View className="flex items-center gap-2 mb-4">
            <View className="i-lucide-message-square w-4 h-4 text-champagne-gold" />
            <Text className="text-obsidian-black text-sm font-medium">备注需求</Text>
          </View>

          <View
            className="relative bg-pearl-white border rounded-md p-3"
            style={{ borderColor: 'rgba(180, 170, 150, 0.5)' }}
          >
            <Input
              className="w-full bg-transparent text-obsidian-black text-sm pl-1"
              placeholder="特殊需求或偏好（如过敏史、喜好等）"
              placeholderClass="text-muted-foreground"
              value={form.notes}
              onInput={(e) => onChange('notes', e.detail.value)}
            />
          </View>
        </View>
      </View>

      <View
        className="fixed bottom-0 left-0 right-0 px-6 py-4 border-t"
        style={{
          background: 'linear-gradient(to top, #faf9f6, rgba(250, 249, 246, 0.95))',
          borderColor: 'rgba(180, 170, 150, 0.3)',
          zIndex: 100
        }}
      >
        <View
          className="bg-obsidian-black rounded-md py-4 flex items-center justify-center active:scale-[0.98]"
          style={{ borderColor: 'rgba(201, 169, 110, 0.6)', borderWidth: 1 }}
          onClick={onSubmit}
        >
          <View className="flex items-center gap-2">
            <View className="i-lucide-check-circle w-4 h-4 text-champagne-gold" />
            <Text className="text-champagne-gold text-base font-medium tracking-wide">
              确认预约
            </Text>
          </View>
        </View>

        <View className="flex items-center justify-center gap-2 mt-3">
          <View className="i-lucide-shield w-3 h-3 text-muted-foreground" />
          <Text className="text-muted-foreground text-xs">您的信息将被安全保护</Text>
        </View>
      </View>
    </View>
  );
}
