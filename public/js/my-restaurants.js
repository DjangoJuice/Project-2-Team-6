$(function () {
    getAllOrders();
    getAllRestaurants();
    getTables();

    //In the Kitchen
    function getAllOrders () {
        $.ajax({
            url: "/api/orders/restaurants/",
            method: "GET"   
        }).then(displayOrders);
    }

    function displayOrders (data) {
        for (var i = 0; i < data.length; i++) {
            if (!data[i].filled) {
                $Order = $("<div>");
                $Order.addClass("border border-dark mb-2 py-2 rounded bg-white");
                $Order.attr("id", "order-" + i);

                $ul = $("<ul>");
                $ul.addClass("list-group mx-3");
                $ul.text(data[i].Customer.Tables[0].Restaurant.restaurantName);

                // $ul = $("<ul>");
                
                $dish = $("<li>");
                $dish.addClass("list-group-item");
                $dish.text(data[i].category + ": " + data[i].dishName);

                $quantity = $("<li>");
                $quantity.addClass("list-group-item");
                $quantity.text("Quantity: " + data[i].dishQuantity);

                if (data[i].notes) {
                    $notes = $("<li>");
                    $notes.addClass("list-group-item");
                    $notes.text("Notes: " + data[i].notes);
                    $ul.append($notes);
                }

                $for = $("<li>");
                $for.addClass("list-group-item");
                if (data[i].Customer.Tables[0].section) {
                    $for.text("Customer: " + data[i].Customer.customerName + " - " + data[i].Customer.Tables[0].tableNum + " (" + data[i].Customer.Tables[0].section + ")");
                } else {
                    $for.text("Customer: " + data[i].Customer.customerName + " - " + data[i].Customer.Tables[0].tableNum);
                }

                $buttonLi = $("<li>");
                $buttonLi.addClass("list-group-item");
                $button = $("<button>");
                $button.addClass("btn btn-sm btn-danger done-btn");
                $button.data("dishId", data[i].id);
                $button.data("order", i);
                $button.text("done");
                $buttonLi.append($button);

                $ul.append($dish);
                $ul.append($quantity);
                $ul.append($for);
                $ul.append($buttonLi);

                // $Order.append($restaurantName);
                $Order.append($ul);

                $("#orders").append($Order);
            }
        }
    

        
        
    }

    $("body").on("click", ".done-btn", function() {
        event.preventDefault();
        var id = $(this).data("dishId");
        var order = $(this).data("order");
        console.log(id);

        queryUrl = "/api/orders/restaurants/" + id,
        $.ajax({
            method: "PUT",
            url: queryUrl,
            data: {
                filled: true
            }
        }).then(function () {
            console.log("successful");
            location.reload();
        });
    });

    //Add Menu Item
    function getAllRestaurants () {
        $.ajax({
            url: "/api/restaurants/",
            method: "GET"   
        }).then(displayAllRestaurants);
    }

    function displayAllRestaurants (data) {
        $div = $("<div>");
        $div.attr("id", "rMenu");
        $div.addClass("list-group mx-3");

        for (var i = 0; i < data.length; i++) {
            $button = $("<button>");
            $button.text(data[i].restaurantName);
            $button.addClass("list-group-item rChoice");
            $button.data("restaurantId", data[i].id);
            
            $div.append($button);
        }
        $("#r-display").append($div);
    }

    //Edit Tables
    function getTables () {
        $.ajax({
            url: "/api/tables/restaurants/",
            method: "GET"   
        }).then(displayTables);
    }

    function displayTables (data) {
       $tableDiv = $("<div>");
       $tableDiv.attr("id", "table-button-div");
       $tableDiv.addClass("list-group mx-3");

       for(var i = 0; i < data.length; i++) { 
        $tableButton = $("<button>");
        $tableButton.text(data[i].tableNum + " - " + data[i].Restaurant.restaurantName);
        $tableButton.addClass("list-group-item choose-table");
        $tableButton.data("tableId", data[i].id);

        $tableDiv.append($tableButton);
       }
        
       $("#update-table-div").append($tableDiv);
    }

    $("body").on("click", ".choose-table", function () {
        console.log("Firing");
        var id = $(this).data("tableId");

        $("#table-button-div").css("display", "none");
        $("#update-table-form").css("display", "block");

        $("#submit-table").on("click", function () {
            event.preventDefault();
            var section = $("#table-section").val().trim();

            $.ajax({
                url: "/api/tables/" + id,
                method: "PUT",
                data: {
                    section: section
                }
            }).then(function () {

                $("#update-table-form").css("display", "none");

                $tableDiv = $("<div>");
                $tableDiv.attr("id", "added-section");

                $tableDiv.html("<p>A section is now associated with this table.</p>");

                $("#update-table-div").append($tableDiv);

                setTimeout(function () {
                    $("#update-table-div").empty();
                    location.reload();
                }, 3000);
            });
        });

    });

    $("#submit-restaurant").on("click", function () {
        event.preventDefault();
        var restaurantName = $("#restaurant-name").val().trim();
        var restaurantAddress = $("#restaurant-address").val().trim();
        var restaurantImage = $("#restaurant-img").val().trim();
        var restaurantDescription = $("#restaurant-description").val().trim();
        var numOfTables = $("#restaurant-tables").val().trim();

        $.ajax({
            url: "/api/restaurants/",
            method: "POST",
            data: {
                restaurantName: restaurantName,
                restaurantAddress: restaurantAddress,
                restaurantImage: restaurantImage,
                restaurantDescription: restaurantDescription 
            }
        }).then(function (result) {
        
                $("#restaurant-added").css("display", "none");

                $restaurantDiv = $("<div>");
                $restaurantDiv.attr("id", "added-dish");

                $restaurantDiv.html("<p>Your restaurant has been added.</p>");

                $("#add-restaurant").append($restaurantDiv);

                createTables();
        });

        function createTables () {
            $.ajax({
                url: "/api/restaurants/",
                method: "GET"   
            }).then(getRestaurant);
        }

        function getRestaurant (data) {
            var id = data[data.length - 1].id;
            var count = 0;
            makeTable();
            function makeTable () {
                if (count < numOfTables) {

                    $.ajax({
                        url: "/api/tables/", 
                        method: "POST",
                        data: {
                            tableNum: "Table " + (count + 1),
                            RestaurantId: id
                        }
                    }).then(function (data) {
                
                        count++;
                        makeTable();
                    });
                } else {
                    setTimeout(function () {
                        $("#add-restaurant").empty();
                        location.reload();
                    }, 3000);
                }
            }
        }
    });

    $("body").on("click", ".rChoice", function() {
        event.preventDefault();
        var id = $(this).data("restaurantId");
        
        //display of all restaurants is hidden
        $("#r-display").css("display", "none");
        //shows form for adding to restaurants menu items
        $("#add-to-menu").css("display", "block");


        $("body").on("click", "#submit-dish", function () {
            var dishName = $("#dish-name").val().trim();
            var dishDescription = $("#dish-description").val().trim();
            var category = $("#dish-category").val().trim();
            var dishPrice = $("#dish-price").val().trim();

            $.ajax({
                url: "/api/dishes/",
                method: "POST",
                data: {
                    dishName: dishName,
                    dishDescription: dishDescription,
                    category: category,
                    dishPrice: dishPrice,
                    RestaurantId: id
                }
            }).then(function (result) {
                $("#add-to-menu").css("display", "none");

                $dishDiv = $("<div>");
                $dishDiv.attr("id", "added-dish");

                $dishDiv.html("<p>This item has been added to the menu.</p>");

                $("#menu-add-section").append($dishDiv);

                setTimeout(function () {
                    $("#menu-add-section").empty();
                    location.reload();
                }, 3000);

            });
        });

    });
});