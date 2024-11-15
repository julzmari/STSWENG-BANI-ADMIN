const express = require("express");
const router = express.Router();
const {getRooms, updateImageReservation} = require('../controllers/rooms.js')

router.get("/get-rooms", getRooms)
router.patch("/update-image-reservation", updateImageReservation)

module.exports = router