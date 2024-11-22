const request = require('supertest');
const { app } = require('../src/server');
const { Reservation } = require('../src/models/models');

jest.mock('../src/models/models', () => ({
    Reservation: { updateOne: jest.fn() },
}));

describe('PATCH /api/update-reservation/:referenceNo', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update reservation and return success message (200 status)', async () => {
        const referenceNo = '123';
        const updatedData = {
            totalAmount: 150,
            amountPaid: 100,
            paymentStatus: 'Paid',
            arrivalStatus: 'Arrived',
            adminNotes: 'Note'
        };

        Reservation.updateOne.mockResolvedValue({ nModified: 1 });

        const response = await request(app)
            .patch(`/api/update-reservation/${referenceNo}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Reservation details updated successfully" });
        expect(Reservation.updateOne).toHaveBeenCalledWith({ referenceNo }, updatedData);
    });

    it('should handle errors and return 500 status', async () => {
        const referenceNo = '123';
        Reservation.updateOne.mockRejectedValue(new Error('Update failed'));

        const response = await request(app)
            .patch(`/api/update-reservation/${referenceNo}`)
            .send({
                totalAmount: 150,
                amountPaid: 100,
                paymentStatus: 'Paid',
                arrivalStatus: 'Arrived',
                adminNotes: 'Note'
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Reservation details update failed" });
    });
});
