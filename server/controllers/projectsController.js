import { supabase } from '../config/supabase.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const getProjects = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  res.json(data)
})

export const getProject = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) throw error
  if (!data) return res.status(404).json({ error: 'Project not found' })
  res.json(data)
})

export const createProject = asyncHandler(async (req, res) => {
  const { title, description, tech, category, live_url, github_url, image_url } = req.body

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' })
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([{ title, description, tech: tech || [], category, live_url, github_url, image_url }])
    .select()
    .single()

  if (error) throw error
  res.status(201).json(data)
})

export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updates = req.body

  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  if (!data) return res.status(404).json({ error: 'Project not found' })
  res.json(data)
})

export const deleteProject = asyncHandler(async (req, res) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', req.params.id)

  if (error) throw error
  res.json({ message: 'Project deleted successfully' })
})
