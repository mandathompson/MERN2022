const express = require('express') 
// Just a cool thing that prints in the console prettier:
const colors = require('colors')
// allows use of .env file
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
// DB Connection: 
const connectDB = require('./config/db')
// take port from .env file OR 5000:
const port = process.env.PORT || 5000

// initialize function to run DB
connectDB()

const app = express()

// Allows us to add data to the body in our api requests:
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))


