import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Services from './pages/Services'
import Staff from './pages/Staff'
import Appointments from './pages/Appointments'

type Tab = 'dashboard' | 'services' | 'staff' | 'appointments'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  const tabs = [
    { id: 'dashboard' as Tab, label: '数据概览', icon: '📊' },
    { id: 'services' as Tab, label: '服务管理', icon: '✨' },
    { id: 'staff' as Tab, label: '技师管理', icon: '👥' },
    { id: 'appointments' as Tab, label: '预约管理', icon: '📅' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 侧边栏 */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">LUMIÈRE</h1>
          <p className="text-sm text-gray-500 mt-1">美学沙龙管理后台</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* 主内容区 */}
      <main className="ml-64 p-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'services' && <Services />}
        {activeTab === 'staff' && <Staff />}
        {activeTab === 'appointments' && <Appointments />}
      </main>
    </div>
  )
}
