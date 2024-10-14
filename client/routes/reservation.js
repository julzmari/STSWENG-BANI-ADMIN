const express = require("express");
const router = express.Router();
const {updateReservation} = require('../controllers/reservation.js')

router.patch("/:id", updateReservation)

module.exports = router