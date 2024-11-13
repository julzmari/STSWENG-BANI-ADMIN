const { Reservation, Client } = require('../models/models.js')

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}); // Fetch reservations

        // Manually populate client data
        const populatedReservations = await Promise.all(reservations.map(async (reservation) => {
            const client = await Client.findOne({ clientId: reservation.clientId }); // Find the client using clientId
            return {
                ...reservation._doc,
                client: client ? { firstName: client.firstName, lastName: client.lastName, contactNumber: client.contactNumber } : null // Add client info to reservation
            };
        }));

        return res.json(populatedReservations);
    } catch (error) {
        console.error("An error occurred when retrieving reservations:", error);
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