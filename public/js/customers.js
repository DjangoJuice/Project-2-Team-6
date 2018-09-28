$(function () {
    getAllRestaurants();
   

    function getAllRestaurants() {
        $.ajax({
            url: "/api/restaurants/",
            method: "GET"   
        }).then(displayAllRestaurants);
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

    var counter = 0;

    //Hava - SVG Ajax Calls - Look here!!!
    $("body").on("click", ".restaurant-btn", function () {
        var id = $(this).data("RestaurantId");

        $("#order-btn").css("display", "inline");
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
                $dishSubmitBtn.text("+");

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
        
        let id = $(this).data("RestaurantId");
        let dishPrice = $(this).data("dishPrice");
        let category = $(this).data("dishCategory");
        let dishName = $(this).data("dishName");

        console.log(dishName);
        //Need to add customerId using local storage

        
        let displayId = $(this).data("displayId");
        
        $("#" + displayId).css("display", "block");

        $("body").on("click", ".form-order-dish-submit", function () {
            $("#" + displayId).css("display", "none");
            let dishQuantityInput = $(this).data("quantity-input");


            let notesInput = $(this).data("notes-input");
            let dishQuantity = $("#" + dishQuantityInput).val().trim();
            let notes = $("#" + notesInput) .val().trim();

            var data = {
                dishName: dishName,
                category: category,
                dishPrice: dishPrice,
                dishQuantity: dishQuantity,
                notes: notes,
                RestaurantId: id,
                CustomerId: 1
            }

            $.ajax({
                url: "/api/orders/restaurants/",
                method: "POST",
                data: data
            });
        });

    });

    $("#pay-btn").on("click", function () {
        payBill();
    });
    //pay bill - tied to pay bill button
    function payBill () {
        $.ajax({
            url: "/api/orders/restaurants/",
            method: "GET"
        }).then(function (data) {
            console.log(data);
            var totalArr = [];
            var total = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].filled) {
                    if(!data[i].paid) {
                        totalArr.push(data[i].dishPrice);
                    }
                }
            }

            for (var j = 0; j < totalArr.length; j++) {
                total += totalArr[i];
            }


            $totalDiv = $("<div>");
            $totalDiv.text("Total: $" + total);

            $("#body-modal-div").append($totalDiv);
        });
    }
    

});

// // POST to ORDER model
            // $.ajax({
            //     url: "/api/orders/restaurants/",
            //     method: "POST",
            //     data: orders[i]
            // }).then(function (data) {
            //     console.log(data);
            // })



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