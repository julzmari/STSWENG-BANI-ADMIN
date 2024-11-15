const express = require("express");
const router = express.Router();
const {getReservations, updateReservation, updateImageReservation} = require('../controllers/reservation.js')

router.get("/get-reservations", getReservations)
router.patch("/update-reservation/:referenceNo", updateReservation)
router.patch("/update-image-reservation/:referenceNo", updateImageReservation)

module.exports = router