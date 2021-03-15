const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const Schema = mongoose.Schema

const reservationschema = new Schema({
    reservationNumber:{
        type: Number
    },
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
    paid:{
        type: Boolean,
        default: false,
        required: true
    },
    reservationType: {
        type: String,
        required: true
    },
    time: {
        type: String
    }
}, {
    timestamps: true
})

reservationschema.plugin(autoIncrement.plugin, {model: 'Reservation', field: 'reservationNumber'})
const Reservation = mongoose.model('Reservation', reservationschema, 'Reservation')

module.exports = Reservation