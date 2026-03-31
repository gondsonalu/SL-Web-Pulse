import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { aboutAPI } from '../../utils/api'
import { uploadImage } from '../../utils/supabase'
import { HiSave, HiUpload, HiX } from 'react-icons/hi'

export default function AdminAbout() {
  const [form, setForm] = useState({
    heading: '', description: '', mission: '',
    ceo_name: '', ceo_title: '', ceo_image: '',
    skills: []
  })
  const [skillInput, setSkillInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    aboutAPI.get()
      .then(res => { if (res.data) setForm(f => ({ ...f, ...res.data })) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: async ([file]) => {
      if (!file) return
      setUploading(true)
      try {
        const url = await uploadImage(file, 'ceo-images')
        setForm(f => ({ ...f, ceo_image: url }))
        toast.success('CEO image uploaded!')
      } catch {
        toast.error('Upload failed')
      } finally {
        setUploading(false)
      }
    }
  })

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm(f => ({ ...f, skills: [...f.skills, skillInput.trim()] }))
      setSkillInput('')
    }
  }

  const removeSkill = (s) => setForm(f => ({ ...f, skills: f.skills.filter(x => x !== s) }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await aboutAPI.update(form)
      toast.success('About section updated!')
    } catch {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">About Section</h1>
          <p className="text-gray-500 text-sm">Edit the about content displayed on the homepage</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <HiSave />}
          Save Changes
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          <div className="glass-card p-6">
            <h3 className="text-white font-medium mb-4">Main Content</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Section Heading</label>
                <input
                  value={form.heading}
                  onChange={e => setForm(f => ({ ...f, heading: e.target.value }))}
                  className="input-field"
                  placeholder="Building Digital Excellence"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="input-field resize-none"
                  rows={4}
                  placeholder="Tell visitors about your agency..."
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Mission Statement</label>
                <textarea
                  value={form.mission}
                  onChange={e => setForm(f => ({ ...f, mission: e.target.value }))}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Our mission is to..."
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card p-6">
            <h3 className="text-white font-medium mb-4">Tech Stack / Skills</h3>
            <div className="flex gap-2 mb-3">
              <input
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="input-field flex-1"
                placeholder="Add skill (e.g. React)"
              />
              <button type="button" onClick={addSkill} className="btn-outline px-4 py-2 text-sm">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.skills.map(s => (
                <span key={s} className="flex items-center gap-1.5 text-xs font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  {s}
                  <button onClick={() => removeSkill(s)} className="hover:text-red-400 transition-colors"><HiX size={10} /></button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <div className="glass-card p-6">
            <h3 className="text-white font-medium mb-4">CEO / Founder Info</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Name</label>
                <input
                  value={form.ceo_name}
                  onChange={e => setForm(f => ({ ...f, ceo_name: e.target.value }))}
                  className="input-field"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Title / Role</label>
                <input
                  value={form.ceo_title}
                  onChange={e => setForm(f => ({ ...f, ceo_title: e.target.value }))}
                  className="input-field"
                  placeholder="CEO & Lead Developer"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-mono mb-2 block">Profile Photo</label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-white/10 rounded-xl p-5 text-center cursor-pointer hover:border-blue-500/30 transition-colors"
                >
                  <input {...getInputProps()} />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                      <p className="text-gray-500 text-xs">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <HiUpload className="text-gray-500 text-xl" />
                      <p className="text-gray-400 text-xs">Upload CEO photo</p>
                    </div>
                  )}
                </div>
                {form.ceo_image && (
                  <div className="mt-3 relative w-16 h-16 rounded-xl overflow-hidden">
                    <img src={form.ceo_image} alt="CEO" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setForm(f => ({ ...f, ceo_image: '' }))}
                      className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-bl-lg flex items-center justify-center text-white"
                    >
                      <HiX size={10} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
