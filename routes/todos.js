var express = require("express");
var router = express.Router();

var db = require("../models") //directs to db models folder that incldes the schema

router.get("/", function(req, res) {
    db.Todo.find() //Todo comes exported from todo.js model
        .then(function(todos) {
            res.json(todos);
        })
        .catch(function(err) {
            res.send(err);
        });
});

router.post("/", function(req, res) {
    db.Todo.create(req.body)
        .then(function(newtodo) {
            res.status(201).json(newtodo);
        })
        .catch(function(err) {
            res.send(err);
        });
});

router.get("/:todoId", function(req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(err) {
            res.send(err);
        });
});

module.exports = router;