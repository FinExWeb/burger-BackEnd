const { shopFood, GetFood, DeleteFood } = require('../controller/order.contoller')
const router = require('express').Router()

router.post('/shopfood', shopFood)
router.get('/shoplist/:userid', GetFood)
router.delete('/shopfood/:id', DeleteFood)

module.exports = router;