var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', function (req, res, next) {
    var user = new User ({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        username: req.body.username,
        firstName: req.body.firstName,
        secondName: req.body.secondName
    });

    user.save(function (err, result) {
        //If an error occurs (mostly validation) it will return a 500 error.
        if (err) {
            res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        //If no errors, it will return a json message "User created".

        var token = jwt.sign({user: user}, 'secret', {expiresIn: 86400});//24hr
        res.status(200).json({
            message: 'Succesfully logged in',
            token: token,
            userId: user._id,
            username: result.username
        });
    });
});

router.post('/signin', function (req, res, next) {
    //Looking for one user with the email the user entered in the login form (email is unique, that's why).
    console.log('Loggin in...');
    User.findOne(
        {email: req.body.email },
        
        function (err, user) {
            //If an error occurs (mostly validation) it will return a 500 error.
            if (err) {
                res.status(500).json({
                    title: 'An error ocurred',
                    error: err
                });
            }

            //If no user is found it will return a 500 error "Wrong credentials".
            if (!user) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                });
            }

            //If the password entered in the form is not the same as the one of the DB, it returns a 500 error "Wrong credentials".
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                });
            }

            //The user exist, so let's create and sign a token. We store the user object
            //secret is the secret key, which should be more secure.
            //the token expires in 2 hours.
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 86400});//24hr
            res.status(200).json({
                message: 'Succesfully logged in',
                token: token,
                userId: user._id,
                username: user.username
            });
        }
    );
});

router.post('/token-expiration', function (req, res, next) {
    jwt.verify(req.body.token, 'secret', function(tokenExpired, decoded) {        
        res.status(200).json({
            expired: tokenExpired
        });
    });
});
module.exports = router;
