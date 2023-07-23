const multer = require('multer');
const router = require('express').Router();
const { getNews, createNews, deleteNews } = require('../controller/new.controller');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + file + './../uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })
router.post('/addnews', upload.single('newIMG'), createNews);

router.get('/news', getNews);
router.delete('/deletenews', deleteNews);
module.exports = router;