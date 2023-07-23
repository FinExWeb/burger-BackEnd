const express = require('express');
const mongoose = require('mongoose');
const noteRouter = require('./router/note.router');
const userRouter = require('./router/user.router');
const Food = require('./model/food.model');
const cors = require('cors');
const path = require('path');
const newsModel = require('./model/news.model');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/note', noteRouter);

app.use("/images", express.static('uploads'));

app.use('/', require('./router/food.router'));
app.use('/shop', require('./router/order.router'));


app.get('/news', async (req, res) => {
    try {
        const foods = await newsModel.find();
        res.status(200).json(foods);
    } catch (error) {
        console.log('Xatolik yuz berdi:', error);
        return res.status(500).json({ error: "Xatolik mavjud" }); // api routeri xatolk berganida ko'rish uchun
    }
})

app.post('/addnews', async (req, res) => {
    const { newFood, newFoodPrice, Restaurant, newFoodGift } = req.body
    const news = {
        newFood,
        newFoodPrice,
        Restaurant,
        newFoodGift
    }
    console.log(news);
    const newNews = await newsModel.create({
        newFood,
        newFoodPrice,
        Restaurant,
        newFoodGift
    })
    res.json(newNews)
})

app.delete('/deletenews/:id', async (req, res) => {
    try {
        const newDeleteID = req.params.id;
        const newDelete = await newsModel.findByIdAndDelete(newDeleteID)

        if (!newDelete) {
            return res.status(404).json({ error: "Mavjud emas!" });
        }

        res.status(200).json({ message: "O'chirildi!" });
    } catch (error) {
        re.status(500).json({ error: error.message });
    }
})

app.get('/api', async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        console.log('Xatolik yuz berdi:', error);
        return res.status(500).json({ error: "Xatolik mavjud" }); // api routeri xatolk berganida ko'rish uchun
    }
});

app.delete('/foodDelete/:id', async (req, res) => {
    try {
        const deleteFoodId = req.params.id;
        const deletedFood = await Food.findByIdAndDelete(deleteFoodId);

        if (!deletedFood) {
            return res.status(404).json({ error: "Taom topilmadi!" });
        }

        res.status(200).json({ message: "Taom o'chirildi" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.patch('/foodPatch/:id', async (req, res, next) => {
    try {
        const patchFoodPatchID = req.params.id;
        const { foodName, price, foodInfo, foodBall } = req.body;
        const updateFood = await Food.findByIdAndUpdate(
            patchFoodPatchID,
            { foodName, price, foodInfo, foodBall },
            { new: true }
        );
        if (!updateFood) {
            return res.status(404).json({ error: "O'zgartirishlar amalga oshirilmadi, bunday ovqat mavjud emas!" })
        }

        res.status(200).json(updateFood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/img/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            console.log('Rasm topilmadi'); // Xatolik yuz berayotganini tekshirish uchun
            return res.status(404).json({ error: "Rasm topilmadi" });
        }
        console.log(req); // Xatolik haqida ma'lumot olish uchun

        res.sendFile(`${__dirname}/uploads/${food.img}`);

    } catch (error) {
        console.log('Xatolik yuz berdi:', error); // Xatolik haqida ma'lumot olish uchun
        res.status(500).json({ error: "Xatolik mavjud" });
    }
});


app.get('/', (req, res) => {
    res.end("This API is not accessible!"); // localhost oddiy holatida
});

mongoose
    .connect('mongodb+srv://jonquin9999:ixtiyor99@cluster0.jifrcdf.mongodb.net/', { // MongoDB bazaga ulanish uchun
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        const port = 5000 || process.env.PORT;
        app.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch(err => console.log(`Have an error:`, err)); // Ulanish xatoligini ko'rish uchun