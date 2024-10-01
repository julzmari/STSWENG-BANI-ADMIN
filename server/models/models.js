const mongoose = require('mongoose');

// Client Schema
const clientSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }, 
},  {
        timestamps: true
});

// Room Schema
const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    bedType: {
        type: String,
        enum: ['Single', 'Double', 'Suite'], 
        required: true
    },
    pax: {
        type: Number,
        required: true,
        min: 1
    }
},  {
    timestamps: true
});

// Reservation Schema
const reservationSchema = new mongoose.Schema({
    referenceNo: {
        type: String,
        required: true,
        unique: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    numberOfAdults: {
        type: Number,
        required: true,
        max: 10
    },
    numberOfChildren: {
        type: Number,
        required: true,
        max: 10
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    pets: {
        type: Boolean,
        default: false
    },
    clientId: {
        type: String,
        required: true,
        ref: 'Client' // Reference to Client model
    },
    roomId: {
        type: String,
        required: true,
        ref: 'Room' // Reference to Room model
    },
    otherNotes: {
        type: String
    }
},  {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);
const Room = mongoose.model('Room', roomSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = { Client, Room, Reservation };