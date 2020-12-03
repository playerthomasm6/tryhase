var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var quote = require("../models/quotes.js");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create all our routes and set up logic within those routes where required.
router.get("/quotes", function(req, res) {
    quote.all(function(data) {
    res.json({ quotes: data });
  });
});

router.post("/quotes", function(req, res) {
  quote.create([
    "author", "quote"
  ], [
    req.body.author, req.body.quote
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/quotes/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  quote.update({
    author: req.body.author,
    quote: req.body.quote
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id });
    }
  });
});

router.delete("/quotes/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  quote.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
