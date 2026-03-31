import { Router } from 'express'
import {
  getProjects, getProject, createProject, updateProject, deleteProject
} from '../controllers/projectsController.js'
import {
  getServices, updateService,
  getAbout, updateAbout,
  submitContact, getContacts, markContactRead,
  adminLogin, verifyAdmin
} from '../controllers/mainControllers.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// ── Projects (public read, protected write) ──────────────────
router.get('/projects', getProjects)
router.get('/projects/:id', getProject)
router.post('/projects', authenticate, createProject)
router.put('/projects/:id', authenticate, updateProject)
router.delete('/projects/:id', authenticate, deleteProject)

// ── Services ─────────────────────────────────────────────────
router.get('/services', getServices)
router.put('/services/:id', authenticate, updateService)

// ── About ─────────────────────────────────────────────────────
router.get('/about', getAbout)
router.put('/about', authenticate, updateAbout)

// ── Contact ───────────────────────────────────────────────────
router.post('/contact', submitContact)
router.get('/contact', authenticate, getContacts)
router.patch('/contact/:id/read', authenticate, markContactRead)

// ── Admin Auth ────────────────────────────────────────────────
router.post('/admin/login', adminLogin)
router.get('/admin/verify', authenticate, verifyAdmin)

export default router
