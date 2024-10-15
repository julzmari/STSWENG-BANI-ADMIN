const express = require("express");
const router = express.Router();
const {getRooms} = require('../controllers/rooms.js')

router.get("/get-rooms", getRooms)

module.exports = router