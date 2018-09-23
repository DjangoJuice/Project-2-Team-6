var db = require("../models");

module.exports = function(app) {
  app.get("/api/restaurants/:id?", function(req, res) {
    if(req.params.id) {
      // Get Restaurant by id
      db.Restaurant.findOne({where: {id: req.params.id}}).then(function(dbRestaurant) {
        res.json(dbRestaurant);
      });
    }
    else {
      // Get all restaurants
      db.Restaurant.findAll({}).then(function(dbRestaurants) {
        res.json(dbRestaurants);
      });
    }
  });

  // Create Restaurant 
  app.post("/api/restaurants/", function(req, res) {
    db.Restaurant.create({
      restaurantName: req.body.restaurantName,
      restaurantAddress: req.body.restaurantAddress,
      restaurantImg: req.body.restaurantImg,
      restaurantDescription: req.body.TEXT,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });

  // Update Restaurant
  app.put("/api/restaurants/:id", function(req, res) {
    db.Restaurant.update({
      restaurantName: req.body.restaurantName,
      restaurantAddress: req.body.restaurantAddress,
      restaurantImg: req.body.restaurantImg,
      restaurantDescription: req.body.TEXT,
      updatedAt: new Date()
    },
    {
      where: {id: req.params.id}
    }).then(function() {
      res.json({message: "Restaurant Updated"});
    });
  });

  // Delete a Restaurant by supplying id
  app.delete("/api/restaurants/:id", function(req, res) {
    db.Restaurant.destroy({ where: { id: req.params.id } }).then(function() {
      res.json({message: "Restaurant Deleted"});
    });
  });
};
