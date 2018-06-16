// Declaring Common object to require from other files
function Common(){}

// Declaring Common object methods
Common.prototype.validate = function(){}
Common.prototype.method2 = function(){}

// Exporting Common variable to get used from other files
module.exports = new Common();