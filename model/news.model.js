// order.model.js
const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    newIMG: { type: String, required: true },
    newFood: { type: String, required: true },
    newFoodPrice: { type: String, required: true },
    Restaurant: { type: String, required: true },
    newFoodGift: { type: String, required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("News", newsSchema);