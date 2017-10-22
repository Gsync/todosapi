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

module.exports = router;