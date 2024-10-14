const express = require("express");
const bodyParser = require("body-parser");
const { Client, Room, Reservation } = require('./models/models.js')

const app = express()
const PORT = 3000

app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.json());

const roomData = require("./models/sampledata/roomData.json")
const clientData = require("./models/sampledata/clientData.json")
const reservationData = require("./models/sampledata/reservationData.json")

//check if the data has been loaded
app.get('/', async function (req, res) {

  const clientCount = await Client.countDocuments();
        if (clientCount === 0) {

            Client.insertMany(clientData)
            .then((clients) => {
                console.log('Imported clients:', clients);
            })
            .catch((err) => {
                console.error('Error importing data:', err);
            });

        } else {
            console.log('Sample client data already imported.');
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
            console.log('Sample room data already imported.');
        }

        // Check and create Reservation if none exists
        const reservationCount = await Reservation.countDocuments();
        if (reservationCount === 0) {
            
            Reservation.insertMany(reservationData)
            .then((reservations) => {
                console.log('Imported reservations:', reservations);
            })
            .catch((err) => {
                console.error('Error importing data:', err);
            });

        } else {
            console.log('Sample reservation data already imported.');
        }
})

//gets reservations from the database and brings them to the reservationData page
app.get ('/api/get-reservations', async function (req, res){

    try{

        const reservationData = await Reservation.find({});

        console.log("Fetching Reservation Data");

        return res.end(JSON.stringify(reservationData));

    }
    catch(error){
        console.error("An error occured when retrieving reservations:\n", error);
        res.status(500).send("Internal Server Error");
    }

})

//update target reservation from database
app.post ('/api/update-reservation', async function (req,res){

    try{
        const {referenceNo,totalAmount,amountPaid,arrivalStatus,adminNotes} = req.query

        const filter = {referenceNo: req.query.referenceNo};

        const updatedData = {

            $set:{
                totalAmount: req.query.totalAmount,
                amountPaid: req.query.amountPaid,
                arrivalStatus: req.query.arrivalStatus,
                adminNotes: req.query.adminNotes,
            }

        }
        
        const reservationData = await Reservation.updateOne(filter,updatedData);
    }
    catch (error){
        console.error("An error occured when updating a reservation:\n", error);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = {app, PORT}

