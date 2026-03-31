import { supabase } from '../config/supabase.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// ===== SERVICES =====
export const getServices = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  res.json(data)
})

export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from('services')
    .update({ ...req.body, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  res.json(data)
})

// ===== ABOUT =====
export const getAbout = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .single()
  if (error) {
    // Return empty default if no record exists yet
    return res.json({})
  }
  res.json(data)
})

export const updateAbout = asyncHandler(async (req, res) => {
  // Upsert: update if exists, insert if not
  const { data: existing } = await supabase.from('about').select('id').single()

  let result
  if (existing?.id) {
    result = await supabase
      .from('about')
      .update({ ...req.body, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single()
  } else {
    result = await supabase
      .from('about')
      .insert([req.body])
      .select()
      .single()
  }

  if (result.error) throw result.error
  res.json(result.data)
})

// ===== CONTACT =====
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, service, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, phone, service, message, is_read: false }])
    .select()
    .single()

  if (error) throw error
  res.status(201).json({ message: 'Message sent successfully', id: data.id })
})

export const getContacts = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  res.json(data)
})

export const markContactRead = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) throw error
  res.json(data)
})

// ===== ADMIN AUTH =====
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  const adminHash = process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD

  if (email !== adminEmail) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Support both hashed and plain passwords (plain for development)
  let valid = false
  if (adminHash?.startsWith('$2')) {
    valid = await bcrypt.compare(password, adminHash)
  } else {
    valid = password === adminHash // dev only
  }

  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' }
  )

  res.json({
    token,
    user: { email, role: 'admin' },
    message: 'Login successful'
  })
})

export const verifyAdmin = asyncHandler(async (req, res) => {
  res.json({ user: req.user, valid: true })
})
