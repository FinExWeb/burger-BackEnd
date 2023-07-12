// food.controller.js
const Food = require('../model/food.model');

exports.addFood = async (req, res, next) => {
    try {
        const { foodName, price, foodInfo, foodBall } = req.body;
        const img = req.file;
        const newFood = await Food.create({
            foodName,
            price,
            foodInfo,
            foodBall,
            img: img.filename,
        });
        res.status(200).json(newFood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFood = async (req, res, next) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: "Xatolik mavjud" });
    }
};
