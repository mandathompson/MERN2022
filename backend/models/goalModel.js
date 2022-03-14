// Schema 
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        requires: [true, 'Please add a text value']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('GoalSchema', goalSchema)