// Schema 
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            requires: true, 
            // Which model does this ID pertain to:
            ref: 'User',
        },
        text: {
            type: String,
            requires: [true, 'Please add a text value']
        }
    }, {
        timestamps: true,
    })

module.exports = mongoose.model('GoalSchema', goalSchema)