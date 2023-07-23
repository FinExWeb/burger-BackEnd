const newsFood = require('../model/news.model');

exports.getNews = async (req, res, next) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createNews = async (req, res, next) => {
    try {
        const { newFood, newFoodPrice, Restaurant, newFoodGift } = req.body;
        const news = await News.create({ newFood, newFoodPrice, Restaurant, newFoodGift });
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params;
        await News.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};