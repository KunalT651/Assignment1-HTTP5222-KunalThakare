import express from 'express';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';

const router = express.Router();

// Admin dashboard
   router.get('/', async (req, res) => {
     console.log('Dashboard route hit');
     const experiences = await Experience.find().sort({ order: 1 });
     console.log('Experiences loaded');
     const skills = await Skill.find().sort({ order: 1 });
     console.log('Skills loaded');
     res.render('admin/dashboard', { experiences, skills });
   });

// --- Experience Routes ---
// List experiences
router.get('/experiences', async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1 });
  res.render('admin/experiences', { experiences });
});
// Add experience form
router.get('/experiences/add', (req, res) => {
  res.render('admin/experience-add');
});
// Add experience POST
router.post('/experiences/add', async (req, res) => {
  let { title, company, location, startDate, endDate, description, order } = req.body;
  if (!order || isNaN(Number(order))) {
    const last = await Experience.findOne().sort({ order: -1 });
    order = last ? last.order + 1 : 1;
  } else {
    order = Number(order);
  }
  await Experience.create({
    title,
    company,
    location,
    startDate,
    endDate,
    description: description.split('\n').map(s => s.trim()).filter(Boolean),
    order
  });
  res.redirect('/admin/experiences');
});
// Delete experience
router.post('/experiences/delete/:id', async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.redirect('/admin/experiences');
});
// Update experience form
router.get('/experiences/edit/:id', async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  res.render('admin/experience-edit', { experience });
});
// Update experience POST
router.post('/experiences/edit/:id', async (req, res) => {
  let { title, company, location, startDate, endDate, description, order } = req.body;
  if (!order || isNaN(Number(order))) {
    const last = await Experience.findOne().sort({ order: -1 });
    order = last ? last.order + 1 : 1;
  } else {
    order = Number(order);
  }
  await Experience.findByIdAndUpdate(req.params.id, {
    title,
    company,
    location,
    startDate,
    endDate,
    description: description.split('\n').map(s => s.trim()).filter(Boolean),
    order
  });
  res.redirect('/admin/experiences');
});

// --- Skill Routes ---
// List skills
router.get('/skills', async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });
  res.render('admin/skills', { skills });
});
// Add skill form
router.get('/skills/add', (req, res) => {
  res.render('admin/skill-add');
});
// Add skill POST
router.post('/skills/add', async (req, res) => {
  let { name, category, order } = req.body;
  if (!order || isNaN(Number(order))) {
    const last = await Skill.findOne().sort({ order: -1 });
    order = last ? last.order + 1 : 1;
  } else {
    order = Number(order);
  }
  await Skill.create({ name, category, order });
  res.redirect('/admin/skills');
});
// Delete skill
router.post('/skills/delete/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/admin/skills');
});
// Update skill form
router.get('/skills/edit/:id', async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.render('admin/skill-edit', { skill });
});
// Update skill POST
router.post('/skills/edit/:id', async (req, res) => {
  let { name, category, order } = req.body;
  if (!order || isNaN(Number(order))) {
    const last = await Skill.findOne().sort({ order: -1 });
    order = last ? last.order + 1 : 1;
  } else {
    order = Number(order);
  }
  await Skill.findByIdAndUpdate(req.params.id, { name, category, order });
  res.redirect('/admin/skills');
});

export default router; 