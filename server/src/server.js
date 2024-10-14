const express = require("express");
const bodyParser = require("body-parser");
const { Client, Room, Reservation } = require('./models/models.js')

const app = express()
const PORT = 3000

app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.json());

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
app.patch('/api/update-reservation/:referenceNo', async function (req,res){

    try{
        const body = req.body
        const referenceNo = req.params.referenceNo

        const filter = {referenceNo: referenceNo}

        const updatedData = {

            
                totalAmount: body.totalAmount,
                amountPaid: body.amountPaid,
                paymentStatus: body.paymentStatus,
                arrivalStatus: body.arrivalStatus,
                adminNotes: body.adminNotes,
        
        }

        await Reservation.updateOne(filter, updatedData);

        res.status(200).json({ message: "Reservation details updated successfully" })
    }
    catch (error){
        console.error("An error occured when updating a reservation:\n", error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = {app, PORT}

