const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dishScheme = new Schema({
    dishName: {
        type: String,
        required: true,
        unique: true
    },
    price: Number
}, {
    timestamps: true
})

const Dish = mongoose.model('Dish', dishScheme, 'Dish')

module.exports = Dish