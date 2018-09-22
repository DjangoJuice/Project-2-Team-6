var db = require("../models");

module.exports = function(app) {
  // Get all restaurants
  app.get("/api/restaurants/", function(req, res) {
    db.Restaurant.findAll({}).then(function(dbRestaurants) {
      res.json(dbRestaurants);
    });
  });

  // Get Restaurant by id
  app.get("/api/restaurants/:id", function(req, res) {
    db.Restaurant.findOne({where: {id: req.params.id}}).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
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
    db.Restaurant.destroy({ where: { id: req.params.id } }).then(function(dbRestaurant) {
      res.json({message: "Restaurant Deleted"});
    });
  });
};
