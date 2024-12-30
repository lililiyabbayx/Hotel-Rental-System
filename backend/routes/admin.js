const express = require('express');
const router = express.Router();
const { addRoom, getRooms } = require('../controllers/adminController');

// Route to add a new room
router.post('/rooms', addRoom);

// Route to get all rooms
router.get('/rooms', getRooms);

module.exports = router;
