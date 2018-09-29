var db = require("../models");

module.exports = function (app) {
   app.get("/api/tables/restaurants/:restaurantId?", function (req, res) {
      if (req.params.restaurantId) {
         // Get Tables by RestaurantId
         db.Table.findAll({
            include: [{
               model: db.Restaurant
            }]
         }, {
            where: {
               RestaurantId: req.params.restaurantId
            }
         }).then(function (dbTables) {
            res.json(dbTables);
         });
      } else {
         // Get Tables Across All Restaurants
         db.Table.findAll({
            include: [{
               model: db.Restaurant
            }]
         }).then(function (dbTables) {
            res.json(dbTables);
         });
      }
   });

   app.get("/api/tables/customers/:customerId?", function (req, res) {
      if (req.params.customerId) {
         db.Table.findAll({
            where: {
               CustomerId: req.params.customerId
            }
         }).then(function (dbTables) {
            res.json(dbTables);
         });
      } else {
         db.Table.findAll({}).then(function (dbTables) {
            res.json(dbTables);
         });
      }
   });

   app.post("/api/tables/", function (req, res) {
      db.Table.create({
         tableNum: req.body.tableNum,
         RestaurantId: req.body.RestaurantId
      }).then(function (dbTables) {
         res.json(dbTables);
      });
   });

   app.put("/api/tables/manage/:tableId", function (req, res) {
      db.Table.update({
         occupied: req.body.occupied,
         CustomerId: 1
      }, {
         where: {
            id: req.params.tableId
         }
      }).then(function () {
         res.json({
            message: "Table updated"
         });
      });
   });

   app.put("/api/tables/:id", function (req, res) {
      db.Table.update({
         section: req.body.section,
      }, {
         where: {
            id: req.params.id
         }
      }).then(function () {
         res.json({
            message: "Table updated"
         });
      });
   });



   app.delete("/api/tables/:id", function (req, res) {
      db.Table.destroy({
         where: {
            id: req.params.id
         }
      }).then(function () {
         res.json({
            message: "Table removed"
         });
      });
   });
};