var mongoose = require('mongoose');

//Setting the Schema type.
var Schema = mongoose.Schema;

//Importing the object that will validate the unique fields of collections
var mongooseUniqueValidator = require('mongoose-unique-validator');

//Creating the user's schema or blueprint
var schema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
});
schema.plugin(mongooseUniqueValidator);

//Creating the user model from the schema created.
module.exports = mongoose.model('User', schema);