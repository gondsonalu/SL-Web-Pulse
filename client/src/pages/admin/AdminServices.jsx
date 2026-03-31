import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { servicesAPI } from '../../utils/api'
import { HiSave, HiPlus, HiX } from 'react-icons/hi'

const iconOptions = ['HiCode', 'HiDeviceMobile', 'HiShoppingCart', 'HiChartBar', 'HiColorSwatch', 'HiCloud']
const colorOptions = ['blue', 'cyan', 'violet', 'green', 'orange', 'pink']

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)

  useEffect(() => {
    servicesAPI.getAll()
      .then(res => setServices(res.data || []))
      .catch(() => toast.error('Failed to load services'))
      .finally(() => setLoading(false))
  }, [])

  const updateService = (id, field, value) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const addFeature = (id) => {
    setServices(prev => prev.map(s =>
      s.id === id ? { ...s, features: [...(s.features || []), 'New Feature'] } : s
    ))
  }

  const updateFeature = (id, i, val) => {
    setServices(prev => prev.map(s => {
      if (s.id !== id) return s
      const features = [...(s.features || [])]
      features[i] = val
      return { ...s, features }
    }))
  }

  const removeFeature = (id, i) => {
    setServices(prev => prev.map(s => {
      if (s.id !== id) return s
      return { ...s, features: s.features.filter((_, j) => j !== i) }
    }))
  }

  const saveService = async (service) => {
    setSaving(service.id)
    try {
      await servicesAPI.update(service.id, service)
      toast.success(`"${service.title}" saved!`)
    } catch {
      toast.error('Failed to save service')
    } finally {
      setSaving(null)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold">Services</h1>
        <p className="text-gray-500 text-sm">Edit the services displayed on the homepage</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {services.map(service => (
          <div key={service.id} className="glass-card p-6">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-gray-400 text-xs font-mono mb-1 block">Title</label>
                <input
                  value={service.title}
                  onChange={e => updateService(service.id, 'title', e.target.value)}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-mono mb-1 block">Color</label>
                <select
                  value={service.color}
                  onChange={e => updateService(service.id, 'color', e.target.value)}
                  className="input-field text-sm appearance-none"
                >
                  {colorOptions.map(c => <option key={c} value={c} className="bg-dark-900 capitalize">{c}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-xs font-mono mb-1 block">Icon</label>
              <select
                value={service.icon}
                onChange={e => updateService(service.id, 'icon', e.target.value)}
                className="input-field text-sm appearance-none"
              >
                {iconOptions.map(i => <option key={i} value={i} className="bg-dark-900">{i}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-xs font-mono mb-1 block">Description</label>
              <textarea
                value={service.description}
                onChange={e => updateService(service.id, 'description', e.target.value)}
                className="input-field resize-none text-sm"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-400 text-xs font-mono">Features</label>
                <button onClick={() => addFeature(service.id)} className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1">
                  <HiPlus size={12} /> Add
                </button>
              </div>
              <div className="space-y-2">
                {(service.features || []).map((feat, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={feat}
                      onChange={e => updateFeature(service.id, i, e.target.value)}
                      className="input-field text-xs flex-1 py-2"
                    />
                    <button onClick={() => removeFeature(service.id, i)} className="text-gray-600 hover:text-red-400 transition-colors">
                      <HiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveService(service)}
              disabled={saving === service.id}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-2 disabled:opacity-60"
            >
              {saving === service.id
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <HiSave size={15} />
              }
              Save Service
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
