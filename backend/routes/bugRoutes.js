const express = require('express');
const BugController = require('../controllers/BugController');

const router = express.Router();

router.post('/bugs', BugController.createBug);
router.get('/bugs', BugController.getAllBugs);
router.get('/bugs/:id', BugController.getBugById);
router.put('/bugs/:id', BugController.updateBug);
router.delete('/bugs/:id', BugController.deleteBug);

module.exports = router;