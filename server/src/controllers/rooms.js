const { Room } = require('../models/models.js')


const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({}); // Fetch rooms

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: "No rooms found." }); // 404 for no rooms found
        }

        return res.status(200).json({ message: "Rooms retrieved successfully.", data: rooms }); // Wrap response
    } catch (error) {
        console.error("An error occurred when retrieving rooms:", error);
        res.status(500).send("Internal Server Error"); // Send generic error message
    }
};

module.exports = {getRooms}