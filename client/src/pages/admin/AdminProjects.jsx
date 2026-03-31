import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { projectsAPI } from '../../utils/api'
import { uploadImage } from '../../utils/supabase'
import { HiPlus, HiPencil, HiTrash, HiX, HiUpload, HiCode, HiCheck } from 'react-icons/hi'

const emptyProject = {
  title: '', description: '', tech: [], category: '',
  live_url: '', github_url: '', image_url: ''
}

function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      onChange(url)
      toast.success('Image uploaded!')
    } catch {
      toast.error('Upload failed. Check Supabase Storage config.')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, maxFiles: 1, maxSize: 5 * 1024 * 1024
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-blue-500/40 hover:bg-white/3'}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <HiUpload className="text-gray-500 text-2xl" />
            <p className="text-gray-400 text-sm">Drop image here or click to browse</p>
            <p className="text-gray-600 text-xs">PNG, JPG, WebP up to 5MB</p>
          </div>
        )}
      </div>
      {value && (
        <div className="mt-3 relative rounded-xl overflow-hidden h-32">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
          >
            <HiX />
          </button>
        </div>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose, onSave }) {
  const [form, setForm] = useState(project || emptyProject)
  const [techInput, setTechInput] = useState('')
  const [saving, setSaving] = useState(false)

  const addTech = () => {
    if (techInput.trim() && !form.tech.includes(techInput.trim())) {
      setForm(p => ({ ...p, tech: [...p.tech, techInput.trim()] }))
      setTechInput('')
    }
  }

  const removeTech = (t) => setForm(p => ({ ...p, tech: p.tech.filter(x => x !== t) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.description) return toast.error('Title and description are required.')
    setSaving(true)
    try {
      await onSave(form)
      onClose()
    } catch {
      toast.error('Failed to save project.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />
        
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-white font-semibold">{project?.id ? 'Edit Project' : 'Add New Project'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <HiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs font-mono mb-2 block">Project Title *</label>
              <input
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="E-Commerce Platform"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs font-mono mb-2 block">Category</label>
              <input
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                placeholder="E-Commerce, SaaS, etc."
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs font-mono mb-2 block">Description *</label>
            <textarea
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Describe this project..."
              rows={3}
              className="input-field resize-none"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs font-mono mb-2 block">Live URL</label>
              <input
                value={form.live_url}
                onChange={e => setForm(p => ({ ...p, live_url: e.target.value }))}
                placeholder="https://example.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs font-mono mb-2 block">GitHub URL</label>
              <input
                value={form.github_url}
                onChange={e => setForm(p => ({ ...p, github_url: e.target.value }))}
                placeholder="https://github.com/..."
                className="input-field"
              />
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <label className="text-gray-400 text-xs font-mono mb-2 block">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Add technology..."
                className="input-field flex-1"
              />
              <button type="button" onClick={addTech} className="btn-outline px-4 py-2 text-sm">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tech.map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  {t}
                  <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400">
                    <HiX size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="text-gray-400 text-xs font-mono mb-2 block">Project Image</label>
            <ImageUploader
              value={form.image_url}
              onChange={url => setForm(p => ({ ...p, image_url: url }))}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <HiCheck />}
              {project?.id ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'new' | project object

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll()
      setProjects(res.data || [])
    } catch {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const handleSave = async (form) => {
    if (form.id) {
      await projectsAPI.update(form.id, form)
      toast.success('Project updated!')
    } else {
      await projectsAPI.create(form)
      toast.success('Project created!')
    }
    fetchProjects()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await projectsAPI.delete(id)
      toast.success('Project deleted')
      fetchProjects()
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">Projects</h1>
          <p className="text-gray-500 text-sm">{projects.length} projects total</p>
        </div>
        <button onClick={() => setModal('new')} className="btn-primary flex items-center gap-2">
          <HiPlus /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <HiCode className="text-gray-600 text-4xl mx-auto mb-4" />
          <p className="text-gray-400 mb-6">No projects yet. Add your first project!</p>
          <button onClick={() => setModal('new')} className="btn-primary">Add Project</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map(project => (
            <motion.div
              key={project.id}
              layout
              className="glass-card overflow-hidden group hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="h-36 bg-gradient-to-br from-blue-600/20 to-indigo-600/10 relative overflow-hidden">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <HiCode className="text-blue-400/20 text-5xl" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                <span className="absolute top-2 left-2 text-xs font-mono text-blue-300 bg-blue-500/20 border border-blue-500/20 px-2 py-0.5 rounded-full">
                  {project.category || 'General'}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium mb-1 truncate">{project.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{project.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal(project)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors"
                  >
                    <HiPencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-colors"
                  >
                    <HiTrash size={13} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <ProjectModal
            project={modal === 'new' ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
