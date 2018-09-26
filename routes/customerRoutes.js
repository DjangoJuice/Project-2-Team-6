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
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        //customer email is passed from the user's email
        customerEmail: req.body.email,
        UserId: req.body.UserId
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });

   // Update Customer's email if the User's email is updated
   app.put("/api/customers/:id", function(req, res) {
    db.Customer.update({
        customerEmail: req.body.customerEmail,
    },
    {
      where: {id: req.params.id}
    }).then(function() {
      res.json({message: "Customer Updated"});
    });
  });

  // Update a Customer's phone
  app.put("/api/customers/:id", function(req, res) {
    db.Customer.update({
        customerPhone: req.body.customerPhone,
    },
    {
      where: {id: req.params.id}
    }).then(function() {
      res.json({message: "Customer Updated"});
    });
  });

  // Delete a Customer by supplying id
  app.delete("/api/customers/:id", function(req, res) {
    db.Customer.destroy({ where: { id: req.params.id } }).then(function() {
      res.json({message: "Restaurant Deleted"});
    });
  });
};
