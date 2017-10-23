var db = require("../models");

exports.getTodos = function(req, res) {
    db.Todo.find() //Todo comes exported from todo.js model
        .then(function(todos) {
            res.json(todos);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
        .then(function(newtodo) {
            res.status(201).json(newtodo);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.getTodo = function(req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.updateTodo = function(req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})//new: true respods with the new update
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(err) {
            res.send(err);
        });
};

exports.deleteTodo = function(req, res) {
    db.Todo.remove({_id: req.params.todoId})
        .then(function(todo) {
            res.send("Record deleted!!!");
        })
        .catch(function(err) {
            res.send(err);
        });
};

module.exports = exports;