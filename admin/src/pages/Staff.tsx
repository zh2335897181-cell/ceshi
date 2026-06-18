import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Staff {
  id: string
  name: string
  title: string
  specialties: string[]
  years_of_experience: number
  rating: number
  service_count: number
  keywords: string[]
  avatar_url: string
  is_active: boolean
}

export default function Staff() {
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    specialties: '',
    years_of_experience: 5,
    rating: 4.8,
    service_count: 0,
    keywords: '',
    avatar_url: '',
    is_active: true
  })

  useEffect(() => {
    fetchStaff()
  }, [])

  async function fetchStaff() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setStaffList(data || [])
    } catch (err) {
      console.error('获取技师列表失败:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const staffData = {
      ...formData,
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
      keywords: formData.keywords.split(',').map(s => s.trim()).filter(Boolean)
    }

    try {
      if (editingStaff) {
        await supabase.from('staff').update(staffData).eq('id', editingStaff.id)
      } else {
        await supabase.from('staff').insert([staffData])
      }
      
      setShowForm(false)
      setEditingStaff(null)
      resetForm()
      fetchStaff()
    } catch (err) {
      console.error('保存失败:', err)
      alert('保存失败')
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      title: '',
      specialties: '',
      years_of_experience: 5,
      rating: 4.8,
      service_count: 0,
      keywords: '',
      avatar_url: '',
      is_active: true
    })
  }

  function handleEdit(staff: Staff) {
    setEditingStaff(staff)
    setFormData({
      name: staff.name,
      title: staff.title || '',
      specialties: Array.isArray(staff.specialties) ? staff.specialties.join(', ') : '',
      years_of_experience: staff.years_of_experience || 5,
      rating: Number(staff.rating) || 4.8,
      service_count: staff.service_count || 0,
      keywords: Array.isArray(staff.keywords) ? staff.keywords.join(', ') : '',
      avatar_url: staff.avatar_url || '',
      is_active: staff.is_active ?? true
    })
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除该技师吗?')) return
    
    try {
      await supabase.from('staff').delete().eq('id', id)
      fetchStaff()
    } catch (err) {
      console.error('删除失败:', err)
    }
  }

  if (loading) return <div className="text-center py-12">加载中...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">技师管理</h2>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          + 添加技师
        </button>
      </div>

      {/* 表单弹窗 */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingStaff ? '编辑技师' : '添加技师'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">姓名 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">职位</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">擅长项目(逗号分隔)</label>
                <input
                  type="text"
                  placeholder="面部护理, SPA, 美甲"
                  value={formData.specialties}
                  onChange={e => setFormData({...formData, specialties: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">从业年限</label>
                  <input
                    type="number"
                    value={formData.years_of_experience}
                    onChange={e => setFormData({...formData, years_of_experience: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">评分</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={e => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">服务人次</label>
                <input
                  type="number"
                  value={formData.service_count}
                  onChange={e => setFormData({...formData, service_count: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">标签(逗号分隔)</label>
                <input
                  type="text"
                  placeholder="温柔细致, 专业认证"
                  value={formData.keywords}
                  onChange={e => setFormData({...formData, keywords: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">头像URL</label>
                <input
                  type="text"
                  value={formData.avatar_url}
                  onChange={e => setFormData({...formData, avatar_url: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={e => setFormData({...formData, is_active: e.target.checked})}
                  id="isActive"
                />
                <label htmlFor="isActive" className="text-sm">启用</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingStaff(null)
                    resetForm()
                  }}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 技师列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">姓名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">职位</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">擅长</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">经验</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">评分</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staffList.map(staff => (
              <tr key={staff.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {staff.avatar_url && (
                      <img src={staff.avatar_url} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <span className="font-medium">{staff.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{staff.title || '-'}</td>
                <td className="px-6 py-4 text-sm">
                  {Array.isArray(staff.specialties) && staff.specialties.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {staff.specialties.slice(0, 2).map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
                          {s}
                        </span>
                      ))}
                      {staff.specialties.length > 2 && (
                        <span className="text-xs text-gray-500">+{staff.specialties.length - 2}</span>
                      )}
                    </div>
                  ) : '-'}
                </td>
                <td className="px-6 py-4 text-sm">{staff.years_of_experience}年</td>
                <td className="px-6 py-4 text-sm">⭐ {staff.rating}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${staff.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {staff.is_active ? '启用' : '禁用'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(staff)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(staff.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {staffList.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  暂无技师数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
