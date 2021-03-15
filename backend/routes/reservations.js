const router = require('express').Router()
let Reservation = require('../models/reservation.model')

router.route('/').get((req, res) => {
    Reservation.find()
        .then(reservations => res.json(reservations))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/').post((req, res) => {
    const newReservation = new Reservation(reservationObject(req.body))
    
    newReservation.save()
        .then(() => res.json('Reservation added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Reservation.findById(req.params.id)
        .then(reservation => {res.json(reservation)})
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').patch((req, res) => {
    const reservation = reservationObject(req.body)

    Reservation.findByIdAndUpdate(req.params.id, reservation)
        .catch(err => res.status(400).json('Error: ' + err))

    Reservation.findById(req.params.id)
        .then(reservation => res.json(reservation))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Reservation.findByIdAndDelete(req.params.id)
        .then(reservation => res.json(reservation))
        .catch(err => res.status(400).json('Error: ' + err))
})

function calculatePrice(entries){
    let totalPrice = 0;
    entries.reduce((acum, entry) =>{   
        totalPrice = totalPrice + (entry.price * entry.quantity)
    })
    return totalPrice
}

function reservationObject(body){
    const name = body.name
    const entries = body.orders
    const adress = body.adress
    const payment = body.payment
    const reservationType = body.reservationType

    return {
        name: name,
        order: entries,
        adress: adress,
        totalPrice: Number(calculatePrice(entries)),
        payment: payment,
        reservationType: reservationType
    }
}

module.exports = router