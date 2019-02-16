const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    res.send("Welcome to the api home page powered by NodeJS")
});

module.exports = router;
