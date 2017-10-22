var express = require('express'),
    app     = express(),
    port    = process.env.port || 3000;

app.get("/", function(req, res) {
    res.send("Response from express");
});

app.listen(port, function() {
    console.log("App is running on port 3000");
});