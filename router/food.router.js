const multer = require('multer');
const { addFood, getFood } = require('../controller/food.controller');
const router = require('express').Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + './../uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/addfood', upload.single('img'), addFood);
router.get('/foods', getFood);
module.exports = router;