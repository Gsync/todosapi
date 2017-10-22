var express = require('express'),
    app     = express(),
    port    = process.env.port || 3000;

var todoRoutes = require("./routes/todos");

app.get("/", function(req, res) {
    res.send("Response from express");
});

app.use("/api/todos", todoRoutes); // sets the root route "/api/todos" === "/" defined in todos.js routes folder

app.get("/json", function(req, res) {
    res.json({message: "this is json"});
});

app.listen(port, function() {
    console.log("App is running on port 3000");
});