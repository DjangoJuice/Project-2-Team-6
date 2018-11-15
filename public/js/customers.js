$(function () {
   // Global variables
   var counter = 0;
   var svgLookupTable = []; // will be multidimensional array
   var svgRestaurantId = null;
   var cTables = null; // will be instance of TableManagementSystem class
   var hasChosenTable = false;

   // handle svg clicks
   $("#svg-content").on("click", ".tableshape", function () {
      // check if table is available
      if (cTables.getTableState(this.id) == 0 && !hasChosenTable) {
         var tableNum = parseInt((this.id).replace(/[^0-9]/gi,""));
         var tableId = svgLookupTable[parseInt(svgRestaurantId)][tableNum];

         cTables.advanceTable(this.id);
         hasChosenTable = true;
         $("#order-btn").css("visibility", "visible");
         $("#order-btn").css("display", "inline-block");
         $("#customer-message-area").text("Please click the \"Order\" button to place the table's order.");

         var displayUpdateMessage = () => "Table Updated!";
         
         $.ajax({
            url: "/api/tables/manage/" + tableId,
            type: "PUT",
            data: {'occupied': true}
         });

      }

   });


   getAllRestaurants();
   getAllTables();


   function getAllRestaurants() {
      $.ajax({
         url: "/api/restaurants/",
         method: "GET"
      }).then(displayAllRestaurants);
   }

   function getAllTables() {
      $.ajax({
         url: "/api/tables/restaurants",
         method: "GET"
      }).then(createLookupTable);
   }

   function getTablesForRestaurant(restaurantID) {
      $.ajax({
         url: "/api/tables/restaurants/" + restaurantID,
         method: "GET"
      }).then(showTableStatesOnSVGFile);
   }


   function showTableStatesOnSVGFile(data) {
      var thisTableData = data.filter(item => item.RestaurantId === svgRestaurantId);
      var thisTableStatesArr = [];

      var mapTableDataToTableStatesArr = (currItem) => {
         var tableNumStr = currItem.tableNum;
         var tableInd = parseInt(tableNumStr.replace(/[^0-9]/gi, "")) - 1;
         thisTableStatesArr[tableInd] = (Boolean(currItem.occupied)) ? 1 : 0;
      };

      thisTableData.forEach(mapTableDataToTableStatesArr);
      cTables = new TableManagementSystem("customer", $("svg"), thisTableStatesArr);
   }

   function createLookupTable(data) {
      svgLookupTable[1] = [];
      svgLookupTable[2] = [];

      var mapToLookupTable = (tableObj) => {
         var tableID = parseInt(tableObj["id"]);
         var restaurantID = parseInt(tableObj["Restaurant"]["id"]);
         var tableNum = parseInt(tableObj.tableNum.replace(/[^0-9]/gi, ""));
         if (svgLookupTable)
            svgLookupTable[restaurantID][tableNum] = tableID;
      };

      data.forEach(mapToLookupTable);
   }



   function injectSVGTableLayout(restID) {
      var svgPath = "/svgs/" + ((restID == 1) ? "BurgerJoint.svg" : "ThaiPlace.svg");

      $.get(svgPath, function (svgText) {
         $("#svg-content").html(svgText);
      }, 'text');

      $("#customer-message-area").text("Please choose an available table.");
   }

   function displayAllRestaurants(data) {
      for (var i = 0; i < data.length; i++) {
         $div = $("<div>");
         $div.addClass("card my-2");
         $div.css("max-width", "18rem");

         $img = $("<img>");
         $img.addClass("card-img-top");
         $img.attr("src", data[i].restaurantImg);
         $img.css("height", "200px");
         // $img.css("width", "200px");

         $body = $("<div>");
         $body.addClass("card-body");

         $nameHeader = $("<h5>");
         $nameHeader.addClass("card-title");
         $nameHeader.text(data[i].restaurantName);

         $descriptionP = $("<p>");
         $descriptionP.addClass("card-text");
         $descriptionP.text(data[i].restaurantDescription);

         $tButton = $("<button>");
         $tButton.addClass("restaurant-btn");
         $tButton.data("RestaurantId", data[i].id)
         $tButton.addClass("btn btn-sm btn-success");
         $tButton.text("Get Seated");

         $div.append($img);

         $body.append($nameHeader);
         $body.append($descriptionP);
         $body.append($tButton);


         $div.append($body);

         $("#all-restaurants").append($div);
      }
   }



   //Hava - SVG Ajax Calls - Look here!!!
   $("body").on("click", ".restaurant-btn", function () {
      var id = $(this).data("RestaurantId");
      svgRestaurantId = id;
      injectSVGTableLayout(id);
      getTablesForRestaurant(id);
      $("#order-btn").css("visibility", "visible");
      $("#order-btn").css("display", "inline-block");
      $("#order-btn").data("RestaurantId", id);

   });

   // Menu/Order
   $("body").on("click", "#order-btn", function () {
      var id = $(this).data("RestaurantId");

      $.ajax({
         url: "/api/dishes/restaurants/" + id,
         method: "GET",
      }).then(function (data) {
         console.log(data);
         for (var i = 0; i < data.length; i++) {
            $div = $("<div>");

            $category = $("<button>");
            $category.addClass("mb-1 btn-block choose-order");
            $category.data("dishName", data[i].dishName);
            $category.attr("display", "block");
            $category.data("dishCategory", data[i].category);
            $category.data("displayId", "display-" + i);
            $category.data("dishPrice", data[i].dishPrice);
            $category.data("RestaurantId", data[i].RestaurantId);

            $category.html("<h5>" + data[i].category + "</h5>" + "<p>" + data[i].dishName + "</p>" + "<p>" + data[i].dishDescription + "</p>" + "<p>$ " + data[i].dishPrice + "</p>");

            $div.append($category);

            $form = $("<form>");
            $form.addClass("mb-2 form-to-order");
            $form.attr("id", "display-" + i);
            $form.css("display", "none");

            $quantityDiv = $("<div>");
            $quantityDiv.addClass("form-group row");

            $quantityLabel = $("<label>");
            $quantityLabel.attr("for", "quantity-input" + i);
            $quantityLabel.addClass("col-sm-2 col-form-label");
            $quantityLabel.text("Quantity");

            $quantityTextDiv = $("<div>");
            $quantityTextDiv.addClass("col-sm-10");

            $quantity = $("<input>");
            $quantity.attr("type", "text");
            $quantity.attr("value", "1");
            $quantity.attr("id", "quantity-input" + i);
            $quantity.addClass("form-control-plaintext");

            $quantityTextDiv.append($quantity);
            $quantityDiv.append($quantityLabel);
            $quantityDiv.append($quantityTextDiv);

            $notesDiv = $("<div>");
            $notesDiv.addClass("form-group row");

            $notesLabel = $("<label>");
            $notesLabel.attr("for", "notes-input" + i);
            $notesLabel.addClass("col-sm-2 col-form-label");
            $notesLabel.text("Notes");

            $notesTextDiv = $("<div>");
            $notesTextDiv.addClass("col-sm-10");

            $textArea = $("<textarea>");
            $textArea.addClass("form-control");
            $textArea.attr("id", "notes-input" + i);
            $textArea.attr("rows", "3");

            $notesTextDiv.append($textArea);
            $notesDiv.append($notesLabel);
            $notesDiv.append($notesTextDiv);

            $dishSubmitBtn = $("<button>");
            $dishSubmitBtn.addClass("btn btn-sm btn-success form-order-dish-submit");
            $dishSubmitBtn.data("notes-input", "notes-input" + i);
            $dishSubmitBtn.data("quantity-input", "quantity-input" + i);
            $dishSubmitBtn.text("Submit");

            $form.append($quantityDiv);
            $form.append($notesDiv);
            $form.append($dishSubmitBtn);

            $("#body-modal").append($div);
            $("#body-modal").append($form);
         }
      });
   });

   //Submit an order 

   $("body").on("click", ".choose-order", function () {
      var id = $(this).data("RestaurantId");
      var dishPrice = $(this).data("dishPrice");
      var category = $(this).data("dishCategory");
      var dishName = $(this).data("dishName");

      //Need to add customerId using local storage


      var displayId = $(this).data("displayId");

      $("#" + displayId).css("display", "block");

      $("body").on("click", ".form-order-dish-submit", function () {
         event.preventDefault();
         $("#" + displayId).css("display", "none");
         var dishQuantityInput = $(this).data("quantity-input");
         var notesInput = $(this).data("notes-input");
         var dishQuantity = $("#" + dishQuantityInput).val().trim();
         var notes = $("#" + notesInput).val().trim();

         // POST to ORDER model
         $.ajax({
            url: "/api/orders/restaurants/",
            method: "POST",
            data: {
               dishName: dishName,
               category: category,
               dishPrice: dishPrice,
               dishQuantity: dishQuantity,
               notes: notes,
               RestaurantId: id,
               //Get userId out of Local storage if we have time to implement passport.
               CustomerId: 1
            }
         }).then(function (data) {
            console.log(data);
         })
      });

   });
});






/*
0.) set orders
var orders = []
1.) whenever we add an order (with quanityt and notes, push an object to a global arr)
orders.push(orderObj)
when orders are set (close modal or hit confirm), run some logic to set aan array of promises
[ object, object, object ]
const promisedOrders = orders.map(order => {
    return $.ajax({
        url: 'stuff',
        method: 'post',
        data: {}
    })
})
promisedOrders is am array of unresolved promises
[<Promise>, <Promise>, ...]
Promise.all(promisedOrders).then(allResults => {
    allResults is an array of every response from all promises
    [ res, res, res, res, res ]
    // ok do logic that i want done after promises are finished (namely confirmation modal)
})
*/