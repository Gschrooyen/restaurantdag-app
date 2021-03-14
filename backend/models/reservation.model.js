const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reservationschema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 5
    },
    adress: {
        city: String,
        zipCode: String,
        street: String,
        number: String,
        appartment: String,
        remarks: String
    },
    order: [{
        dishName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: Number,
        remarks: String
    }],
    totalPrice: {
        type: Number
    },
    payment: {
        type: String,
        required: true
    },
    reservationType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Reservation = mongoose.model('Reservation', reservationschema, 'Reservation')

module.exports = Reservation