const { Reservation } = require('../models/models.js')

const getReservations = async (req, res) => {

    try{

        const reservationData = await Reservation.find({});

        console.log("Fetching Reservation Data");

        return res.end(JSON.stringify(reservationData));
    }
    catch (error) {
        //console.error("An error occured when retrieving reservations:\n", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateReservation = async (req, res) => {

    try {

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

    } catch (error) {
        //console.error(error)
        res.status(500).json({ message: "Reservation details update failed" });
    }
    
};

module.exports = {getReservations, updateReservation}