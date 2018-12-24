var connection = require("../config/connection.js");


var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.

// Create all our routes and set up logic within those routes where required.
router.get("/predictions", function(req, res) {
  connection.query("SELECT * FROM games;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { games: data, style: "predictions.css" });
  });
});


router.get("/", function(req, res) {
  connection.query("SELECT * FROM games;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("passport", { games: data });
  });
});


// Show the user the individual quote and the form to update the quote.
router.get("/results", function(req, res) {
  connection.query("SELECT games.Home,games.away, user_pick.winner FROM games LEFT JOIN user_pick ON games.id = user_pick.id ORDER BY games.id;",  function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    console.log(data);
    res.render("single-quote", {games: data, style:"results.css"});
    
  });
});

router.post("/api/user_pick", function(req, res) {

  connection.query("INSERT INTO user_pick (winner) VALUES ( ?)",[req.body.winner], function(err,result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }

  
    res.json({ id: result.insertId });
  });
});

router.delete("/api/user_pick/", function(req, res) {

  connection.query("DELETE FROM nfl_games_db.user_pick ", [req.body.winner, req.params.id], function(err, result) {

    if (err) {

      // If an error occurred, send a generic server failure

      return res.status(500).end();

    }

    else if (result.affectedRows === 0) {

      // If no rows were changed, then the ID must not exist, so 404

      return res.status(404).end();

    }


    
    res.status(200).end();



  });

  connection.query("ALTER TABLE nfl_games_db.user_pick AUTO_INCREMENT = 1 ", [req.body.winner, req.params.id], function(err, result) {

    if (err) {

      // If an error occurred, send a generic server failure

      return res.status(500).end();

    }

    else if (result.affectedRows === 0) {

      // If no rows were changed, then the ID must not exist, so 404

      return res.status(404).end();

    }


    
    res.status(200).end();



  });

});


// Update a quote by an id and then redirect to the root route.
router.put("/api/user_pick/:id", function(req, res) {
  connection.query(
    "UPDATE user_pick SET winner = ? WHERE id = ?",

    [req.body.winner, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});
// Export routes for server.js to use.
module.exports = router;
