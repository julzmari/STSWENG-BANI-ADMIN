const express = require("express");
const bodyParser = require("body-parser");
//encryption
const bcrypt = require('bcrypt');
const { Client, Room, Reservation, Admin } = require('./models/models.js')

//add cors for comm between diff ports
const cors = require('cors');
const app = express()
const PORT = 3000

app.use(cors());
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.json());

const roomData = require("./models/sampledata/roomData.json")

// for login validation
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;  // Get username and password from request body
  
    try {
      // search by name
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid username or password test-user' });
      }
  
      // check password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password test-password' });
      }
  
      // return success message + token
      res.json({ message: 'Login successful', token: 'mockAuthToken' });  // replace with actual token l8r
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
// for login validation
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
            
            Room.insertMany(roomData)
            .then((rooms) => {
                console.log('Imported rooms:', rooms);
            })
            .catch((err) => {
                console.error('Error importing data:', err);
            });
            
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
                "roomId": "Room 1",
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

