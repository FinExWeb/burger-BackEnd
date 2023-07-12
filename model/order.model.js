const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    food: { type: mongoose.Schema.ObjectId, ref: 'Food' },
    order: { type: Boolean, default: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("Shop", orderSchema)