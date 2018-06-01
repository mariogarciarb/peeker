var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.use('/home', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.redirect('/auth/signin');
        }

        next();
    });
});//
router.use('/chat', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.redirect('/auth/signin');
        }

        next();
    });
});

module.exports = router;
