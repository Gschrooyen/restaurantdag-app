const router = require('express').Router()
let Dish = require('../models/dish.model')

router.route('/').get((req, res) => {
    Dish.find()
        .then(dish => res.json(dish))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/').post((req, res) => {
    const newDish = new Dish(dishObject(req.body))

    newDish.save()
        .then(() => res.json('Dish added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').patch((req, res) => {
    
    Dish.findOneAndUpdate({dishName: req.body.dishName}, dishObject(req.body))
        .then(dish => res.json(dish))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Dish.findByIdAndDelete(req.params.id)
        .then(dish => res.json(dish))
        .catch(err => res.status(400).json('Error: ' + err))
})

function dishObject(body) {
    return{
        dishName: body.dishName,
        price: body.price
    }
}

module.exports = router