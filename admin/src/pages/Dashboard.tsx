import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalStaff: 0,
    todayAppointments: 0,
    monthRevenue: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      const [{ count: servicesCount }, { count: staffCount }, { data: appointments }] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('staff').select('*', { count: 'exact', head: true }),
        supabase.from('appointments').select('*')
      ])

      const today = new Date().toISOString().split('T')[0]
      const todayCount = appointments?.filter(a => a.date === today).length || 0
      
      const monthRevenue = appointments?.reduce((sum, a) => {
        return sum + (parseFloat(a.service_price) || 0)
      }, 0) || 0

      setStats({
        totalServices: servicesCount || 0,
        totalStaff: staffCount || 0,
        todayAppointments: todayCount,
        monthRevenue
      })
    } catch (error) {
      console.error('加载统计数据失败:', error)
    }
  }

  const cards = [
    { label: '服务项目', value: stats.totalServices, icon: '✨', color: 'bg-blue-50 text-blue-600' },
    { label: '专业技师', value: stats.totalStaff, icon: '👥', color: 'bg-green-50 text-green-600' },
    { label: '今日预约', value: stats.todayAppointments, icon: '📅', color: 'bg-purple-50 text-purple-600' },
    { label: '本月收入', value: `¥${stats.monthRevenue}`, icon: '💰', color: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">数据概览</h2>
      
      <div className="grid grid-cols-4 gap-6">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${card.color}`}>
                {card.label}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors">
            添加新服务
          </button>
          <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
            添加技师
          </button>
          <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
            查看预约
          </button>
        </div>
      </div>
    </div>
  )
}
