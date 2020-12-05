// ======================================================
// DEPENDENCIES
var express = require("express");
var app = express();

// ======================================================
var PORT = process.env.PORT || 8080;

// SERVE STATIC CONTENT
app.use(express.static("public"));

// PARSE APP BODY AS JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// IMPORT ROUTES & GIVE SERVER ACCESS
var routes = require("./controllers/burgerController.js");

app.use(routes);

// START SERVER
app.listen(PORT, function(){
  console.log("Server is listening on: http://localhost: " + PORT);
})
