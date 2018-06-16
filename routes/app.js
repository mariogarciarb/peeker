var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.use('^((?!auth).)*$', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            console.log('redirigido porque me sALE DEL NABOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
            return res.redirect('/auth/signin');
        }

        next();
    });
});

router.get('/', function (req, res, next) {
    res.render('index');
});


// VERIFY DEPENGIND ON THE ROUTE NAME. APP EXCEPT AUTH PROHIBIDO ACCEDER SIN TOKEN GOOD
//Si ruta no contiene auth verificamos token
// router.use('/home', function (req, res, next) {
//     jwt.verify(req.query.token, 'secret', function(err, decoded) {
//         if (err) {
//             return res.redirect('/auth/signin');
//         }

//         next();
//     });
// });
// router.use('/chat', function (req, res, next) {
//     jwt.verify(req.query.token, 'secret', function(err, decoded) {
//         if (err) {
//             return res.redirect('/auth/signin');
//         }

//         next();
//     });
// });

module.exports = router;
