const request = require('supertest');
const { app } = require('../src/server');
const { Reservation, Client } = require('../src/models/models');

jest.mock('../src/models/models', () => ({
    Reservation: { find: jest.fn() },
    Client: { findOne: jest.fn() },
}));

describe('GET /api/get-reservations', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return populated reservations with client data (200 status)', async () => {
        const mockReservations = [
            { _id: '1', clientId: 'client1', _doc: { _id: '1', clientId: 'client1' } },
            { _id: '2', clientId: 'client2', _doc: { _id: '2', clientId: 'client2' } }
        ];

        const mockClients = {
            client1: { clientId: 'client1', firstName: 'John', lastName: 'Doe', contactNumber: '1234567890' },
            client2: { clientId: 'client2', firstName: 'Jane', lastName: 'Smith', contactNumber: '0987654321' },
        };

        Reservation.find.mockResolvedValue(mockReservations);
        Client.findOne.mockImplementation(({ clientId }) =>
            Promise.resolve(mockClients[clientId] || null)
        );

        const response = await request(app).get('/api/get-reservations');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                _id: '1',
                clientId: 'client1',
                client: { firstName: 'John', lastName: 'Doe', contactNumber: '1234567890' },
            },
            {
                _id: '2',
                clientId: 'client2',
                client: { firstName: 'Jane', lastName: 'Smith', contactNumber: '0987654321' },
            },
        ]);
    });

    it('should handle errors and return 500 status', async () => {
        Reservation.find.mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/api/get-reservations');

        expect(response.status).toBe(500);
        expect(response.text).toBe('Internal Server Error');
    });
});
