const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const bugRoutes = require('./bugRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/bugs', bugRoutes);

module.exports = router;
