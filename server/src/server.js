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
            const newClient = new Client({
                clientId: 'C123456',
                firstName: 'John',
                lastName: 'Doe',
                contactNumber: '+1234567890',
                email: 'john.doe@example.com',
                address: '123 Main St, Springfield, USA',
            });

            await newClient.save();
            console.log('Client created:', newClient);
        } else {
            console.log('Client already exists.');
        }

  const roomCount = await Room.countDocuments();
        if (roomCount === 0) {
            const newRoom = new Room({
                roomId: 'R1001',
                bedType: 'Single',
                pax: 1,
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
                referenceNo: 'RES001',
                checkInDate: new Date('2024-10-10T15:00:00Z'),
                checkOutDate: new Date('2024-10-15T11:00:00Z'),
                numberOfAdults: 2,
                numberOfChildren: 1,
                numberOfGuests: 3,
                pets: false,
                clientId: 'C123456', // Use the client ID created earlier
                roomId: 'R1001',     // Use the room ID created earlier
                otherNotes: 'Late check-in requested',
            });

            await newReservation.save();
            console.log('Reservation created:', newReservation);
        } else {
            console.log('Reservation already exists.');
        }
})

module.exports = {app, PORT}

