const router = require('express').Router()
let Dish = require('../models/dish.model')

router.route('/').get((req, res) => {
    Dish.find()
        .then(dish => res.json(dish))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/').post((req, res) => {
    Dish.create
})