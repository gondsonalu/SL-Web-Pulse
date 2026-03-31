-- ================================================================
--  SLWebPulse — Supabase Database Schema
--  Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────────
--  TABLE: projects
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at  TIMESTAMPTZ NOT NULL    DEFAULT NOW(),
  updated_at  TIMESTAMPTZ,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL,
  tech        TEXT[]      DEFAULT '{}',
  category    TEXT,
  live_url    TEXT,
  github_url  TEXT,
  image_url   TEXT,
  sort_order  INTEGER     DEFAULT 0,
  is_featured BOOLEAN     DEFAULT FALSE
);

-- ────────────────────────────────────────────────────────────────
--  TABLE: services
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at  TIMESTAMPTZ NOT NULL    DEFAULT NOW(),
  updated_at  TIMESTAMPTZ,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL,
  icon        TEXT        DEFAULT 'HiCode',
  color       TEXT        DEFAULT 'blue',
  features    TEXT[]      DEFAULT '{}',
  sort_order  INTEGER     DEFAULT 0,
  is_active   BOOLEAN     DEFAULT TRUE
);

-- ────────────────────────────────────────────────────────────────
--  TABLE: about  (single-row config table)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS about (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at  TIMESTAMPTZ NOT NULL    DEFAULT NOW(),
  updated_at  TIMESTAMPTZ,
  heading     TEXT        DEFAULT 'Building Digital Excellence',
  description TEXT,
  mission     TEXT,
  ceo_name    TEXT        DEFAULT 'Suraj L.',
  ceo_title   TEXT        DEFAULT 'CEO & Lead Developer',
  ceo_image   TEXT,
  skills      TEXT[]      DEFAULT '{}'
);

-- ────────────────────────────────────────────────────────────────
--  TABLE: contact_messages
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at  TIMESTAMPTZ NOT NULL    DEFAULT NOW(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  service     TEXT,
  message     TEXT        NOT NULL,
  is_read     BOOLEAN     DEFAULT FALSE
);

-- ────────────────────────────────────────────────────────────────
--  INDEXES
-- ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_created    ON projects   (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured   ON projects   (is_featured);
CREATE INDEX IF NOT EXISTS idx_services_sort       ON services   (sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_contact_created     ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_is_read     ON contact_messages (is_read);

-- ────────────────────────────────────────────────────────────────
--  ROW LEVEL SECURITY (RLS)
-- ────────────────────────────────────────────────────────────────
ALTER TABLE projects          ENABLE ROW LEVEL SECURITY;
ALTER TABLE services          ENABLE ROW LEVEL SECURITY;
ALTER TABLE about             ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages  ENABLE ROW LEVEL SECURITY;

-- Projects: anyone can read, only service role can write
CREATE POLICY "projects_public_read"  ON projects
  FOR SELECT USING (true);

CREATE POLICY "projects_service_write" ON projects
  FOR ALL USING (auth.role() = 'service_role');

-- Services: anyone can read, only service role can write
CREATE POLICY "services_public_read"  ON services
  FOR SELECT USING (true);

CREATE POLICY "services_service_write" ON services
  FOR ALL USING (auth.role() = 'service_role');

-- About: anyone can read, only service role can write
CREATE POLICY "about_public_read"  ON about
  FOR SELECT USING (true);

CREATE POLICY "about_service_write" ON about
  FOR ALL USING (auth.role() = 'service_role');

-- Contact: anyone can INSERT (submit form), only service role can read/update
CREATE POLICY "contact_public_insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "contact_service_all" ON contact_messages
  FOR ALL USING (auth.role() = 'service_role');

-- ────────────────────────────────────────────────────────────────
--  SEED: Default Services
-- ────────────────────────────────────────────────────────────────
INSERT INTO services (title, description, icon, color, features, sort_order) VALUES
  (
    'Custom Web Development',
    'Full-stack web applications built with modern technologies. React, Node.js, and cutting-edge frameworks tailored to your business needs.',
    'HiCode', 'blue',
    ARRAY['React / Next.js', 'Node.js Backend', 'REST APIs', 'Database Design'],
    1
  ),
  (
    'Responsive Design',
    'Mobile-first designs that look stunning on every screen size. Pixel-perfect UI/UX that converts visitors into loyal customers.',
    'HiDeviceMobile', 'cyan',
    ARRAY['Mobile First', 'Cross-browser', 'Accessibility', 'Performance'],
    2
  ),
  (
    'E-Commerce Solutions',
    'Complete online stores with payment integration, inventory management, and seamless checkout experiences.',
    'HiShoppingCart', 'violet',
    ARRAY['Payment Gateway', 'Inventory System', 'Cart & Checkout', 'Analytics'],
    3
  ),
  (
    'SEO & Performance',
    'Rank higher on Google with technical SEO, Core Web Vitals optimization, and lightning-fast load times.',
    'HiChartBar', 'green',
    ARRAY['Core Web Vitals', 'Technical SEO', 'Speed Optimization', 'Analytics Setup'],
    4
  ),
  (
    'UI/UX Design',
    'Beautiful, intuitive interfaces designed to delight users and drive conversions. From wireframes to final polished UI.',
    'HiColorSwatch', 'orange',
    ARRAY['Figma Design', 'Prototyping', 'Brand Identity', 'Design System'],
    5
  ),
  (
    'Deployment & Hosting',
    'Reliable, scalable cloud deployment on Vercel, AWS, or your preferred platform with CI/CD pipelines.',
    'HiCloud', 'pink',
    ARRAY['Vercel / AWS', 'CI/CD Pipeline', 'SSL & Security', 'Monitoring'],
    6
  )
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────────────────────────────
--  SEED: Default About record
-- ────────────────────────────────────────────────────────────────
INSERT INTO about (heading, description, mission, ceo_name, ceo_title, skills)
VALUES (
  'Building Digital Excellence',
  'We are a passionate team of developers, designers, and strategists based in India. Since 2019, we''ve been helping businesses establish a powerful online presence through clean code, stunning design, and data-driven strategies.',
  'Our mission is to democratize access to world-class web development, making premium digital experiences affordable for every business — from startups to enterprises.',
  'Suraj L.',
  'CEO & Lead Developer',
  ARRAY['React', 'Node.js', 'Next.js', 'Supabase', 'PostgreSQL', 'MongoDB', 'AWS', 'Figma', 'TailwindCSS', 'TypeScript']
) ON CONFLICT DO NOTHING;
