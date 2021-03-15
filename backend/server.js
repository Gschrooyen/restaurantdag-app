const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
autoIncrement.initialize(mongoose.connection)

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const reservationRouter = require('./routes/reservations')
const dishRouter = require('./routes/dishes')

app.use('/reservations', reservationRouter)
app.use('/dishes', dishRouter)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})