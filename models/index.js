var mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.connect('mongodb://localhost/todoapi');

mongoose.Promise = Promise; //it will allow us to use the .then rather than callback fn.

module.exports.Todo = require("./todo")