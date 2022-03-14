const express = require('express') 
// allows use of .env file
const dotenv = require('dotenv').config()
// take port from .env file OR 5000:
const port = process.env.PORT || 5000

const app = express()

app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))
