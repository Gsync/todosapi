var express = require('express'),
    app     = express(),
    PORT    = process.env.PORT || 3001,
    bodyParser = require('body-parser');

var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes); // sets the root route "/api/todos" === "/" defined in todos.js routes folder

app.get("/json", function(req, res) {
    res.json({message: "this is json"});
});

app.listen(PORT, function() {
    console.log(`App is running on ${PORT}`);
});