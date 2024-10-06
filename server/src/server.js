const express = require("express");
const bodyParser = require("body-parser");
const { Client, Room, Reservation } = require('./models/models.js')

const app = express()
const PORT = 3000

app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.json());

app.get('/', async function (req, res) {

  const clientCount = await Client.countDocuments();
        if (clientCount === 0) {
            const newClient = new Client(
                {
                    "clientId": "C12345",
                    "firstName": "John",
                    "lastName": "Doe",
                    "contactNumber": "+1234567890",
                    "email": "john.doe@example.com",
                    "address": "123 Main Street, Cityville, Countryland"
                }
            );

            await newClient.save();
            console.log('Client created:', newClient);
        } else {
            console.log('Client already exists.');
        }

  const roomCount = await Room.countDocuments();
        if (roomCount === 0) {
            const newRoom = new Room({
                "roomId": "R001",
                "bedType": "Double",
                "pax": 2,
                "price": 120.50
              });

              await newRoom.save();
            console.log('Room created:', newRoom);
        } else {
            console.log('Room already exists.');
        }

        // Check and create Reservation if none exists
        const reservationCount = await Reservation.countDocuments();
        if (reservationCount === 0) {
            const newReservation = new Reservation({
                "referenceNo": "R123456789",
                "checkInDate": "2024-10-10T14:00:00Z",
                "checkOutDate": "2024-10-15T11:00:00Z",
                "numberOfAdults": 2,
                "numberOfChildren": 1,
                "numberOfGuests": 3,
                "pets": false,
                "clientId": "C12345",
                "roomId": "R001",
                "otherNotes": "Prefer a quiet room with a view.",
                "adminNotes": "Confirmed by admin, no special requests."
              });

            await newReservation.save();
            console.log('Reservation created:', newReservation);
        } else {
            console.log('Reservation already exists.');
        }
})

module.exports = {app, PORT}

