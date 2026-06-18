import { useState, useEffect } from 'react'

type Appointment = {
  id: string
  reservation_no: string
  user_name: string
  user_phone: string
  date: string
  time: string
  status: 'pending' | 'completed' | 'cancelled'
  guest_count: number
}

const mockAppointments: Appointment[] = [
  { id: '1', reservation_no: 'RES001', user_name: '张女士', user_phone: '138****1234', date: '2026-06-20', time: '14:00', status: 'pending', guest_count: 1 },
  { id: '2', reservation_no: 'RES002', user_name: '李女士', user_phone: '139****5678', date: '2026-06-19', time: '10:30', status: 'completed', guest_count: 2 },
  { id: '3', reservation_no: 'RES003', user_name: '王先生', user_phone: '137****9012', date: '2026-06-18', time: '15:00', status: 'cancelled', guest_count: 1 },
]

export default function Appointments() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all')
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter)

  const updateStatus = (id: string, newStatus: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
  }

  const statusLabels = { pending: '待到店', completed: '已完成', cancelled: '已取消' }
  const statusColors = { pending: 'bg-yellow-100 text-yellow-800', completed: 'bg-green-100 text-green-800', cancelled: 'bg-gray-100 text-gray-800' }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">预约管理</h2>
      
      {/* 筛选器 */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'completed', 'cancelled'] as const).map(key => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg ${filter === key ? 'bg-amber-500 text-white' : 'bg-white border'}`}
          >
            {key === 'all' ? '全部' : statusLabels[key]}
          </button>
        ))}
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">预约编号</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">客户姓名</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">联系电话</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">预约时间</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">人数</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map(apt => (
              <tr key={apt.id}>
                <td className="px-6 py-4 text-sm">{apt.reservation_no}</td>
                <td className="px-6 py-4 text-sm">{apt.user_name}</td>
                <td className="px-6 py-4 text-sm">{apt.user_phone}</td>
                <td className="px-6 py-4 text-sm">{apt.date} {apt.time}</td>
                <td className="px-6 py-4 text-sm">{apt.guest_count}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[apt.status]}`}>
                    {statusLabels[apt.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  {apt.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(apt.id, 'completed')} className="text-green-600 hover:underline">完成</button>
                      <button onClick={() => updateStatus(apt.id, 'cancelled')} className="text-red-600 hover:underline">取消</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-500">暂无预约记录</div>
        )}
      </div>
    </div>
  )
}
