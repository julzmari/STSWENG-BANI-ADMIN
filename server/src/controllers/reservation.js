const { Reservation } = require('../models/models.js')


const updateReservation = async (req, res) => {

    try {

        const body = req.body
        const referenceNo = req.params.referenceNo

        const filter = {referenceNo: referenceNo}

        const updatedData = {

            $set:{
                totalAmount: body.totalAmount,
                amountPaid: body.amountPaid,
                paymentStatus: body.paymentStatus,
                arrivalStatus: body.arrivalStatus,
                adminNotes: body.adminNotes,
            }
        }

        await Reservation.updateOne(filter, updatedData);

        res.status(200).json({ message: "Reservation details updated successfully" })

    } catch (error) {
        console.error(error)
        res.status(res.status).json({ message: "Reservation details update failed" });
    }
    
};

module.exports = {updateReservation}