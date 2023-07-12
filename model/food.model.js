// food.model.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    img: { type: String, required: true },
    foodName: { type: String, required: true },
    price: { type: String, required: true },
    foodInfo: { type: String, required: true },
    foodBall: { type: String, required: true },
}, {
    timestamps: true
});
module.exports = mongoose.model("Food", foodSchema);

