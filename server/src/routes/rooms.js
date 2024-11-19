const express = require("express");
const router = express.Router();
const {getRooms, updateImageRoom} = require('../controllers/rooms.js')

router.get("/get-rooms", getRooms)
router.patch("/updateimage-room/:roomId", updateImageRoom)

module.exports = router