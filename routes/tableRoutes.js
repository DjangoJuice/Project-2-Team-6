
var db = require("../models");

module.exports = function(app) {
    // Get Tables Across All Restaurants
    app.get("/api/tables/", function(req, res) {
        db.Table.findAll({}).then(function(dbTables) {
            res.json(dbTables);
        });
    });
    // Get Tables by RestaurantId
    app.get("/api/tables/restaurants/:restaurantId", function(req, res) {
        db.Table.findAll({where: {RestaurantId: req.params.restaurantId}}).then(function(dbTables){
            res.json(dbTables);
        });
    });

    app.post("/api/tables", function(req, res) {
        db.Table.create({
            tableNum: req.body.tableNum,
            section: req.body.section,
            RestaurantId: req.body.RestaurantId
        }).then(function(dbRestaurant) {
            res.json(dbRestaurant);
        });
    });

    app.put("/api/tables/:id", function(req, res) {
        db.Table.update({
            tableNum: req.body.tableNum,
            section: req.body.section,
            RestaurantId: req.body.RestaurantId
        }, {
            where: {id: req.params.id}
        }).then(function() {
            res.json({message: "Table updated"})
        });
    });

    app.delete("/api/tables/:id", function(req, res) {
        db.Table.destroy({where: {id: req.params.id}}).then(function() {
            res.json({message: "Table removed"});
        })
    });
};
  