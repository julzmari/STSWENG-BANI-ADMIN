const express = require("express");
const router = express.Router();
const {getReservations, updateReservation} = require('../controllers/reservation.js')

router.get("/get-reservations", getReservations)
router.patch("/update-reservation/:referenceNo", updateReservation)

module.exports = router