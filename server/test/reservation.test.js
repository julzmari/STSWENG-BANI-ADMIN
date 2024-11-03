const request = require('supertest');
const { app } = require('../src/server.js');
const { updateReservation } = require('../src/controllers/reservation');
const { Client, Reservation } = require('../src/models/models.js');

    jest.mock('../src/models/models.js', () => ({
        Reservation: {
            find: jest.fn(),
            updateOne: jest.fn(),
        },
        Client: {
            find: jest.fn(),
            findOne: jest.fn(),
        },
    }));

    describe('GET /api/get-reservations', () => {
        it('should return reservations with populated client information', async () => {
            // Mock reservation data to match the provided structure
            const reservationData = [
                {
                    _id: '672271c1334445a03b95524d',
                    referenceNo: 'R00000001',
                    checkInDate: new Date('2024-10-31T00:00:00.000Z'),
                    checkOutDate: new Date('2024-11-01T00:00:00.000Z'),
                    numberOfAdults: 1,
                    numberOfChildren: 0,
                    numberOfGuests: 1,
                    pets: false,
                    clientId: 'C00000003',
                    roomId: 'Room 1',
                    totalAmount: 0,
                    amountPaid: 0,
                    arrivalStatus: 'Cancelled',
                    otherNotes: '',
                    adminNotes: 'Change of mind',
                    createdAt: new Date('2024-10-30T17:49:53.948Z'),
                    updatedAt: new Date('2024-11-01T11:45:39.019Z'),
                    _doc: {}, // mock document property
                },
                {
                    _id: '67249958daf1c2b2c6fda700',
                    referenceNo: 'R00000002',
                    checkInDate: new Date('2024-11-01T00:00:00.000Z'),
                    checkOutDate: new Date('2024-11-03T00:00:00.000Z'),
                    numberOfAdults: 3,
                    numberOfChildren: 2,
                    numberOfGuests: 5,
                    pets: false,
                    clientId: 'C00000004',
                    roomId: 'Room 3',
                    totalAmount: 9900,
                    amountPaid: 5000,
                    arrivalStatus: 'Booked',
                    otherNotes: '1 Extra Bed',
                    adminNotes: '',
                    createdAt: new Date('2024-11-01T09:03:20.060Z'),
                    updatedAt: new Date('2024-11-01T09:41:12.504Z'),
                    _doc: {}, // mock document property
                },
            ];
    
            // Mock client data for each reservation's `clientId`
            const clientData = [
                {
                    clientId: 'C00000003',
                    firstName: 'John',
                    lastName: 'Doe',
                    contactNumber: '09182727364',
                },
                {
                    clientId: 'C00000004',
                    firstName: 'Karen',
                    lastName: 'Smith',
                    contactNumber: '09174536634',
                },
            ];
    
            // Set up mock implementations for Reservation and Client
            Reservation.find.mockResolvedValue(reservationData);
            Client.findOne.mockImplementation(({ clientId }) =>
                Promise.resolve(clientData.find((client) => client.clientId === clientId))
            );
    
            // Make the request
            const response = await request(app).get('/api/get-reservations');
    
            // Verify response status
            expect(response.status).toBe(200);
    
            // Verify response body matches expected structure
            expect(response.body).toEqual([
                {
                    _id: '672271c1334445a03b95524d',
                    referenceNo: 'R00000001',
                    checkInDate: '2024-10-31T00:00:00.000Z',
                    checkOutDate: '2024-11-01T00:00:00.000Z',
                    numberOfAdults: 1,
                    numberOfChildren: 0,
                    numberOfGuests: 1,
                    pets: false,
                    clientId: 'C00000003',
                    roomId: 'Room 1',
                    totalAmount: 0,
                    amountPaid: 0,
                    arrivalStatus: 'Cancelled',
                    otherNotes: '',
                    adminNotes: 'Change of mind',
                    createdAt: '2024-10-30T17:49:53.948Z',
                    updatedAt: '2024-11-01T11:45:39.019Z',
                    client: {
                        firstName: 'John',
                        lastName: 'Doe',
                        contactNumber: '09182727364',
                    },
                },
                {
                    _id: '67249958daf1c2b2c6fda700',
                    referenceNo: 'R00000002',
                    checkInDate: '2024-11-01T00:00:00.000Z',
                    checkOutDate: '2024-11-03T00:00:00.000Z',
                    numberOfAdults: 3,
                    numberOfChildren: 2,
                    numberOfGuests: 5,
                    pets: false,
                    clientId: 'C00000004',
                    roomId: 'Room 3',
                    totalAmount: 9900,
                    amountPaid: 5000,
                    arrivalStatus: 'Booked',
                    otherNotes: '1 Extra Bed',
                    adminNotes: '',
                    createdAt: '2024-11-01T09:03:20.060Z',
                    updatedAt: '2024-11-01T09:41:12.504Z',
                    client: {
                        firstName: 'Karen',
                        lastName: 'Smith',
                        contactNumber: '09174536634',
                    },
                },
            ]);
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