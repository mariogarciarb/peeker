var mongoose = require('mongoose');

//Setting the Schema type.
var Schema = mongoose.Schema;

//Importing the object that will validate the unique fields of collections
var mongooseUniqueValidator = require('mongoose-unique-validator');

//Creating the user's schema or blueprint
var schema = new Schema({
    name: {type: String, required, unique: true},
    password: {type: String, required },
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
});
schema.plugin(mongooseUniqueValidator);

//Creating the user model from the schema created.
module.exports = mongoose.model('User', schema);