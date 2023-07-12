const userModel = require('../model/user.model');
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const SECRET_KEY = 'NOTESAPI';

const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Bunday foydalanuvchi mavjud!" });
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const result = await userModel.create({
            email: email,
            password: hashPassword,
            fullname: fullname
        });

        const tokenCR = jsonwebtoken.sign({ email: result.email, userId: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, tokenCR: tokenCR });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Xatolik mavjud!' });
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "Bunday foydalanuvchi mavjud emas!" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ message: "Bu hisob ma'lumotlari yaroqsiz" });
        }

        const tokenCR = jsonwebtoken.sign({ email: existingUser.email, userId: existingUser._id }, SECRET_KEY);
        res.status(200).json({ user: existingUser, tokenCR: tokenCR });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Xatolik mavjud!' });
    }
}

module.exports = { signin, signup };