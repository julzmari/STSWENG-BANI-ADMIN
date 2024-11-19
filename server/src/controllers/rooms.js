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

const updateImageRoom =  async (req, res) => {

    try {
        body = req.body
        const roomId = req.params.roomId;

        const filter = {roomId: roomId};
        
        // const room = await Room.findOne(filter);
        // if (!room || room.length === 0) {
        //     return res.status(404).json({ message: "No rooms found." }); // 404 for no rooms found
        // }

        const updatedData = {
            images: body.imgUrl
        }

        console.log("----------------------------------------------------\n" + body.imgUrl + "\n" + roomId);

        const update = await Room.findOneAndUpdate(filter, updatedData, {new:true});
        
        console.log("Update Result:", update);

        res.status(200).json({ message: "Reservation details updated successfully" })

    } catch (error) {
        //console.error(error)
        res.status(500).json({ message: "Reservation details update failed" });
    }
    
};

module.exports = {getRooms, updateImageRoom}