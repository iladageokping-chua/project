const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/edit-task/:id', taskController.renderEditTaskPage); // Ensure this route exists
router.post('/edit-task/:id', taskController.editTask);
router.post('/update-status/:id', taskController.updateTaskStatus);

module.exports = router;