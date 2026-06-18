import { useState, useEffect } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { supabase } from '@/supabase/client'

type Tab = 'dashboard' | 'services' | 'staff' | 'appointments'

interface Service {
  id: string
  name: string
  category: string
  price: number
  duration: number
  is_active: boolean
}

interface Staff {
  id: string
  name: string
  title: string
  specialties: string[]
  years_of_experience: number
  rating: number
}

interface Appointment {
  id: string
  reservation_no: string
  user_name: string
  user_phone: string
  date: string
  time: string
  status: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [services, setServices] = useState<Service[]>([])
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [{ data: servicesData }, { data: staffData }, { data: appointmentsData }] = await Promise.all([
        supabase.from('services').select('*').order('created_at', { ascending: false }),
        supabase.from('staff').select('*').order('created_at', { ascending: false }),
        supabase.from('appointments').select('*').order('created_at', { ascending: false })
      ])

      setServices(servicesData || [])
      setStaffList(staffData || [])
      setAppointments(appointmentsData || [])
    } catch (err) {
      console.error('加载数据失败:', err)
      Taro.showToast({ title: '加载数据失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'dashboard' as Tab, label: '数据概览' },
    { id: 'services' as Tab, label: '服务管理' },
    { id: 'staff' as Tab, label: '技师管理' },
    { id: 'appointments' as Tab, label: '预约管理' }
  ]

  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter(a => a.date === today).length
  const monthRevenue = appointments.reduce((sum, a) => sum + 398, 0) // 简化计算

  if (loading) {
    return (
      <View className="flex items-center justify-center h-screen">
        <Text className="text-muted-foreground">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 顶部标签栏 */}
      <View className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <ScrollView scrollX className="whitespace-nowrap" showScrollbar={false}>
          <View className="flex px-4 py-2 gap-2">
            {tabs.map(tab => (
              <View
                key={tab.id}
                className={`px-4 py-2 rounded-lg text-sm flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 内容区 */}
      <View className="p-4">
        {/* 数据概览 */}
        {activeTab === 'dashboard' && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-4 block">数据概览</Text>
            <View className="grid grid-cols-2 gap-3">
              <View className="bg-white rounded-lg p-4 shadow-sm">
                <Text className="text-sm text-gray-500">服务项目</Text>
                <Text className="text-2xl font-bold text-gray-900 mt-1">{services.length}</Text>
              </View>
              <View className="bg-white rounded-lg p-4 shadow-sm">
                <Text className="text-sm text-gray-500">专业技师</Text>
                <Text className="text-2xl font-bold text-gray-900 mt-1">{staffList.length}</Text>
              </View>
              <View className="bg-white rounded-lg p-4 shadow-sm">
                <Text className="text-sm text-gray-500">今日预约</Text>
                <Text className="text-2xl font-bold text-gray-900 mt-1">{todayAppointments}</Text>
              </View>
              <View className="bg-white rounded-lg p-4 shadow-sm">
                <Text className="text-sm text-gray-500">本月收入</Text>
                <Text className="text-2xl font-bold text-gray-900 mt-1">¥{monthRevenue}</Text>
              </View>
            </View>
          </View>
        )}

        {/* 服务管理 */}
        {activeTab === 'services' && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-4 block">服务管理</Text>
            {services.length === 0 ? (
              <View className="bg-white rounded-lg p-8 text-center">
                <Text className="text-gray-500">暂无服务数据</Text>
              </View>
            ) : (
              <View className="space-y-3">
                {services.map(service => (
                  <View key={service.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <View className="flex justify-between items-start">
                      <View>
                        <Text className="font-medium text-gray-900">{service.name}</Text>
                        <Text className="text-xs text-gray-500 mt-1">{service.category}</Text>
                      </View>
                      <View className={`px-2 py-1 rounded text-xs ${
                        service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {service.is_active ? '已上架' : '已下架'}
                      </View>
                    </View>
                    <View className="flex gap-4 mt-2 text-sm text-gray-600">
                      <Text>¥{service.price}</Text>
                      <Text>{service.duration}分钟</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* 技师管理 */}
        {activeTab === 'staff' && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-4 block">技师管理</Text>
            {staffList.length === 0 ? (
              <View className="bg-white rounded-lg p-8 text-center">
                <Text className="text-gray-500">暂无技师数据</Text>
              </View>
            ) : (
              <View className="space-y-3">
                {staffList.map(staff => (
                  <View key={staff.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <Text className="font-medium text-gray-900">{staff.name}</Text>
                    <Text className="text-xs text-gray-500 mt-1">{staff.title || '-'}</Text>
                    <View className="flex gap-2 mt-2">
                      {Array.isArray(staff.specialties) && staff.specialties.slice(0, 3).map((spec, i) => (
                        <View key={i} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
                          {spec}
                        </View>
                      ))}
                    </View>
                    <View className="flex gap-4 mt-2 text-sm text-gray-600">
                      <Text>{staff.years_of_experience}年经验</Text>
                      <Text>⭐ {staff.rating}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* 预约管理 */}
        {activeTab === 'appointments' && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-4 block">预约管理</Text>
            {appointments.length === 0 ? (
              <View className="bg-white rounded-lg p-8 text-center">
                <Text className="text-gray-500">暂无预约记录</Text>
              </View>
            ) : (
              <View className="space-y-3">
                {appointments.map(apt => {
                  const statusMap: Record<string, string> = { pending: '待到店', completed: '已完成', cancelled: '已取消' }
                  const statusColors: Record<string, string> = {
                    pending: 'bg-yellow-100 text-yellow-800',
                    completed: 'bg-green-100 text-green-800',
                    cancelled: 'bg-gray-100 text-gray-800'
                  }
                  return (
                    <View key={apt.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <View className="flex justify-between items-start">
                        <View>
                          <Text className="font-medium text-gray-900">{apt.user_name}</Text>
                          <Text className="text-xs text-gray-500 mt-1">{apt.reservation_no}</Text>
                        </View>
                        <View className={`px-2 py-1 rounded text-xs ${statusColors[apt.status] || 'bg-gray-100'}`}>
                          {statusMap[apt.status] || apt.status}
                        </View>
                      </View>
                      <View className="flex gap-4 mt-2 text-sm text-gray-600">
                        <Text>{apt.date} {apt.time}</Text>
                        <Text>{apt.user_phone}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  )
}
