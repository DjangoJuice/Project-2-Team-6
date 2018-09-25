$(function () {
    getAllOrders();
    getAllRestaurants();

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
                $Order.addClass("border border-dark mb-2 py-2 rounded");
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
                $for.text("Customer: " + data[i].Customer.customerName + " - " + data[i].Customer.Tables[0].tableNum);

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
        console.log(data);
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

    $("#submit-restaurant").on("click", function () {
        event.preventDefault();
        var restaurantName = $("#restaurant-name").val().trim();
        var restaurantAddress = $("#restaurant-address").val().trim();
        var restaurantImage = $("#restaurant-img").val().trim();
        var restaurantDescription = $("#restaurant-description").val().trim();

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
            console.log(result);
                $("#restaurant-added").css("display", "none");

                $restaurantDiv = $("<div>");
                $restaurantDiv.attr("id", "added-dish");

                $restaurantDiv.html("<p>Your restaurant has been added.</p>");

                $("#add-restaurant").append($restaurantDiv);

                setTimeout(function () {
                    $("#add-restaurant").empty();
                    location.reload();
                }, 3000);
        })
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


            })
        })








    });
});