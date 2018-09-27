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

        //You have to physically walk into a restaurant to choose your table and thus trigger this button. So an Order button shouldn't be made more than once.
        if (counter < 1) {
            counter++;
            $mButton = $("<button>");
            $mButton.addClass("mx-5 my-3");
            $mButton.attr("id", "order-btn");
            $mButton.data("RestaurantId", id);
            $mButton.attr("data-toggle", "modal");
            $mButton.attr("data-target", "to-order-modal");
            $mButton.addClass("btn btn-sm btn-info");
            $mButton.text("Order");
    
            $("#menu-btn-here").append($mButton);
        }

    });

//Menu/Order
    $("body").on("click", "#order-btn", function () {
        var id = $(this).data("RestaurantId");
        console.log(id);
        $.ajax({
            url: "/api/dishes/restaurants/" + id,
            method: "GET",
        }).then(function (data) {
            console.log(data);
        });
    });

    
});