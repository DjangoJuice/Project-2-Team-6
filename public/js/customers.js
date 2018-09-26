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

            $button = $("<button>");
            $button.addClass("restaurant-btn");
            $button.attr("dataRestaurantId", data[i].id)
            $button.addClass("btn btn-sm btn-success");
            $button.text("Get Seated");

            $div.append($img);

            $body.append($nameHeader);
            $body.append($descriptionP);
            $body.append($button);

            $div.append($body);

            $("#all-restaurants").append($div);
        }
    }


    //Hava - SVG Ajax Calls - Look here!!!
    $("body").on("click", ".restaurant-btn", function () {
        var id = $(this).data("dataRestaurantId");
        

    });

    
});