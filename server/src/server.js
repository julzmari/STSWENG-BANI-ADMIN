const express = require("express");
const bodyParser = require("body-parser");

//encryption
const bcrypt = require('bcrypt');
const { Client, Room, Admin } = require('./models/models.js')
//const { Client, Room, Reservation, Admin } = require('./models/models.js')
const reservation = require("./routes/reservation.js")
const rooms = require("./routes/rooms.js")

//add cors for comm between diff ports
const cors = require('cors');
const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(cors());
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.json());

app.use("/api", reservation)
app.use("/api", rooms)



// for login validation
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;  // Get username and password from request body
  
    try {
      // search by name
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // check password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // return success message + token
      res.json({ message: 'Login successful', token: 'mockAuthToken' });  // replace with actual token l8r
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
// for login validation


//gets reservations from the database and brings them to the reservationData page
/*app.get ('/api/get-reservations', async function (req, res){

    try{

        const reservationData = await Reservation.find({});

        console.log("Fetching Reservation Data");

        return res.end(JSON.stringify(reservationData));

    }
    catch(error){
        console.error("An error occured when retrieving reservations:\n", error);
        res.status(500).send("Internal Server Error");
    }

})*/

//update target reservation from database
/*app.patch('/api/update-reservation/:referenceNo', async function (req,res){

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
})*/

module.exports = {app, PORT}

