var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }

        next();
    });
});
router.get('/', function (req, res, next) {
    //Looking for one user with the email the user entered in the login form (email is unique, that's why).
    var decoded = jwt.decode(req.query.token);
    User.findOne({_id: decoded.user._id})
        .populate('friends')
        .select('username firstName secondName')
        .exec(function(err, user) {
            if (err) {
                res.status(500).json({
                    title: 'An error ocurred',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Contacts found',
                contacts: user.friends
            });
        });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        //If an error occurs (mostly validation) it will return a 500 error.
        if (err) {
            res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }

        for (let contact of user.friends) {
            if (contact.username === req.body.username) {                
                return res.status(401).json({
                    title: 'User already friend',
                    error: {message: 'User not found'}
                });
            }
        }
        
        //Searching for the user to set as a friend by username.
        User.findOne(
            {username: req.body.username },            
            function (err, friend) {
                //If an error occurs (mostly validation) it will return a 500 error.
                if (err) {
                    res.status(500).json({
                        title: 'An error ocurred',
                        error: err
                    });
                }

                //If no user is found it will return a 500 error "Wrong credentials".
                if (!friend) {
                    return res.status(401).json({
                        title: 'User not found',
                        error: {message: 'User not found'}
                    });
                }
                
                //Adding user as friend and saving in DB.                
                user.friends.push(friend);
                user.save(function (err, result) {
                    //If an error occurs (mostly validation) it will return a 500 error.
                    if (err) {
                        res.status(500).json({
                            title: 'An error ocurred',
                            error: err
                        });
                    }
                    
                    //TODO: For simplicity friends list is personal. Withouth a verification.
                    
                    // friend.friends.push(user);
                    // friend.save(function (err, result) {
                    //     //If an error occurs (mostly validation) it will return a 500 error.
                    //     if (err) {
                    //         res.status(500).json({
                    //             title: 'An error ocurred',
                    //             error: err
                    //         });
                    //     }
                    //     //If no errors, it will return a json message "User created".
                    //     res.status(201).json({
                    //         message: 'Friendship created',
                    //         res: true
                    //     });        
                    // });

                    res.status(201).json({
                        message: 'Friendship created',
                        res: true
                    });
                });
            });
    });
});


router.post('/find', function (req, res, next) {
    //Looking for one user with the email the user entered in the login form (email is unique, that's why).
    User.findOne(
        {email: req.body.username },
        
        function (err, user) {
            var userToSend;
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
                    title: 'User not found',
                    error: {message: 'User not found'}
                });
            }
            
            userToSend = {
                username: user.username,
                firstName: user.firstName,
                secondName: user.secondName,
            }

            res.status(200).json({
                message: 'User found',
                user: userToSend
            });
        });
});

router.post('/search', function (req, res, next) {
    //Looking for users whose username attribute contains the string received as "username"
    var query = User.find({username: { $regex: '.*' + req.body.username + '.*' } })
        .select('username firstName secondName');

    query.exec(function (err, users) {
        //If an error occurs (mostly validation) it will return a 500 error.
        if (err) {
            res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        
        //If no user is found it will return a 500 error "Wrong credentials".
        if (!users) {
            return res.status(401).json({
                title: 'User not found',
                error: {message: 'User not found'}
            });
        }
        
        res.status(200).json({
            message: 'User found',
            users: users
        });
    });
});

module.exports = router;
