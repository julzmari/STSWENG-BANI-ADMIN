const { getReservations, updateReservation } = require('../src/controllers/reservation');
const { Reservation } = require('../src/models/models.js');

jest.mock('../src/models/models.js', () => ({
    Reservation: {
        find: jest.fn(),
        updateOne: jest.fn(),
    },
}));

describe('Reservation Controller', () => {

    describe('getReservations', () => {
        
        it('should fetch all reservations successfully', async () => {
            const req = {}; // Mock request object
            const res = {
                end: jest.fn(), // Mock response end method
                status: jest.fn().mockReturnThis() // Mock status method for chaining
            };

            // Mock the Reservation.find method
            Reservation.find.mockResolvedValue([{ referenceNo: '123', totalAmount: 100 }]);

            await getReservations(req, res);

            expect(Reservation.find).toHaveBeenCalledWith({});
            expect(res.end).toHaveBeenCalledWith(JSON.stringify([{ referenceNo: '123', totalAmount: 100 }]));
        });

        it('should handle errors correctly', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            // Mock an error in the Reservation.find method
            Reservation.find.mockRejectedValue(new Error('Database error'));

            await getReservations(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Internal Server Error');
        });
    });

    describe('updateReservation', () => {
        it('should update reservation details successfully', async () => {
            const req = {
                params: { referenceNo: '123' },
                body: {
                    totalAmount: 150,
                    amountPaid: 100,
                    paymentStatus: 'Paid',
                    arrivalStatus: 'Arrived',
                    adminNotes: 'Note'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Mock the Reservation.updateOne method
            Reservation.updateOne.mockResolvedValue({ nModified: 1 });

            await updateReservation(req, res);

            expect(Reservation.updateOne).toHaveBeenCalledWith(
                { referenceNo: '123' },
                {
                    totalAmount: 150,
                    amountPaid: 100,
                    paymentStatus: 'Paid',
                    arrivalStatus: 'Arrived',
                    adminNotes: 'Note',
                }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Reservation details updated successfully" });
        });

        it('should handle errors during update', async () => {
            const req = {
                params: { referenceNo: '123' },
                body: {
                    totalAmount: 150,
                    amountPaid: 100,
                    paymentStatus: 'Paid',
                    arrivalStatus: 'Arrived',
                    adminNotes: 'Note'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Mock an error in the Reservation.updateOne method
            Reservation.updateOne.mockRejectedValue(new Error('Update failed'));

            await updateReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(500); // Adjust this based on your error handling
            expect(res.json).toHaveBeenCalledWith({ message: "Reservation details update failed" });
        });
    });
});