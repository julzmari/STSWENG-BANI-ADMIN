const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Admin Schema
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
  });


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
    floor: {
        type: Number,
        enum: [1, 2],
        required: true,
    },
    bedType: {
        type: String,
        enum: ['Queen', 'King'],
        required: false
    },
    bedNum: {
        type: Number,
        required: false,
    },
    pax: {
        type: Number,
        required: true,
    },
    maxPax: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    additionalPrice: {
        type: Number,
        required: false,
    },
    images: {
        type: String,
        required: false,
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
    totalAmount: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    arrivalStatus: {
        type: String,
        enum: ["Booked", "Checked-in", "Checked-out", "New Reservations", "Cancelled"],
        required: true
    },
    otherNotes: {
        type: String
    },
    adminNotes: {
        type: String
    },
},  {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);
const Room = mongoose.model('Room', roomSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Client, Room, Reservation, Admin };