const Room = require('../models/Room');

// Add a new room
exports.addRoom = async (req, res) => {
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all rooms
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json(err);
    }
};
