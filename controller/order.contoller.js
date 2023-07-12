const OrderFood = require('../model/order.model')

exports.shopFood = async (req, res, next) => {
    try {
        const { user, food } = req.body

        const newshop = await OrderFood.create({ user: user, food: food })

        await res.status(201).json(newshop)
    } catch (error) {
        await res.status(500).json("Xatolik mavjud!: " + error.message)
    }
}

exports.GetFood = async (req, res, next) => {
    try {
        const { userid } = req.params

        const shopList = await OrderFood.find({ user: userid }).populate("food")

        await res.status(201).json(shopList)
    } catch (error) {
        await res.status(500).json("Xatolik mavjud!: " + error.message)
    }
}

exports.DeleteFood = async (req, res, next) => {
    try {
        const { id } = req.params

        const newshop = await OrderFood.findByIdAndDelete(id)

        await res.status(201).json(newshop)
    } catch (error) {
        await res.status(500).json("Xatolik mavjud!: " + error.message)
    }
}