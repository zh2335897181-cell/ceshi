import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  is_active: boolean
  image_url: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 60,
    category: 'facial',
    image_url: ''
  })

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setServices(data || [])
    } catch (err) {
      console.error('加载服务失败:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      if (editingId) {
        await supabase.from('services').update(formData).eq('id', editingId)
      } else {
        await supabase.from('services').insert([{ ...formData, is_active: true }])
      }
      
      setShowForm(false)
      setEditingId(null)
      setFormData({ name: '', description: '', price: 0, duration: 60, category: 'facial', image_url: '' })
      loadServices()
    } catch (err) {
      alert('操作失败: ' + (err as Error).message)
    }
  }

  async function toggleStatus(id: string, isActive: boolean) {
    try {
      await supabase.from('services').update({ is_active: !isActive }).eq('id', id)
      loadServices()
    } catch (err) {
      alert('操作失败')
    }
  }

  async function deleteService(id: string) {
    if (!confirm('确定删除此服务?')) return
    try {
      await supabase.from('services').delete().eq('id', id)
      loadServices()
    } catch (err) {
      alert('删除失败')
    }
  }

  function startEdit(service: Service) {
    setEditingId(service.id)
    setFormData({
      name: service.name,
      description: service.description || '',
      price: Number(service.price),
      duration: service.duration,
      category: service.category || 'facial',
      image_url: service.image_url || ''
    })
    setShowForm(true)
  }

  if (loading) return <div className="text-center py-12">加载中...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">服务管理</h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); }}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          + 添加服务
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{editingId ? '编辑服务' : '添加服务'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="服务名称"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <textarea
                placeholder="服务描述"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="价格"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="px-3 py-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="时长(分钟)"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                  className="px-3 py-2 border rounded"
                  required
                />
              </div>
              <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="facial">面部护理</option>
                <option value="nail">美甲美睫</option>
                <option value="spa">SPA放松</option>
                <option value="hair">发型设计</option>
              </select>
              <input
                type="url"
                placeholder="图片URL"
                value={formData.image_url}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                className="w-full px-3 py-2 border rounded"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">
                  保存
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border rounded">
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">服务名称</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">分类</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">价格</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">时长</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map(service => (
              <tr key={service.id}>
                <td className="px-6 py-4">{service.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{service.category}</td>
                <td className="px-6 py-4">¥{service.price}</td>
                <td className="px-6 py-4">{service.duration}分钟</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {service.is_active ? '已上架' : '已下架'}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => toggleStatus(service.id, service.is_active)} className="text-blue-600 hover:text-blue-800 text-sm">
                    {service.is_active ? '下架' : '上架'}
                  </button>
                  <button onClick={() => startEdit(service)} className="text-amber-600 hover:text-amber-800 text-sm">
                    编辑
                  </button>
                  <button onClick={() => deleteService(service.id)} className="text-red-600 hover:text-red-800 text-sm">
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
