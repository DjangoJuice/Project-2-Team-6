var db = require("../models");

module.exports = function(app) {
  app.get("/api/customers/:id?", function(req, res) {
    if(req.params.id) {
      // Get Customer by id
      db.Customer.findOne({where: {id: req.params.id}}).then(function(dbCustomer) {
        res.json(dbCustomer);
      });
    }
    else {
      // Get all Customers
      db.Customer.findAll({}).then(function(dbCustomer) {
        res.json(dbCustomer);
      });
    }
  });

  // Create Customer 
  app.post("/api/customers/", function(req, res) {
    db.Customer.create({
      customerName: req.body.restaurantName,
      customerPhone: req.body.restaurantAddress,
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
