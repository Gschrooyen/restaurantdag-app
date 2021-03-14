const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dishScheme = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: Number
})

const Dish = mongoose.model('Dish', reservationschema, 'Dish')

module.exports = Dish