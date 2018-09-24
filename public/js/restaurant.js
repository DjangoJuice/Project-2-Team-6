$(function () {

    GetAllRestaurants();

    //for homepage
    function GetAllRestaurants () {
        $.ajax({
            url: "/api/restaurants/",
            method: "GET"
        }).then(RestaurantGet)
    }

    function RestaurantGet (data) {
        console.log(data);

        for (var i = 0; i < data.length; i++) {
            $cardWrapper = $("<div>");
            $cardWrapper.addClass("col-md-4");
            $restaurantCard = $("<div>");
            $restaurantCard.addClass("card");

            $restaurantImg = $("<img>");
            $restaurantImg.addClass("card-img-top restaurant");
            $restaurantImg.attr("data-id", data[i].id);
            $restaurantImg.attr("src", data[i].restaurantImg);
            $restaurantImg.css("height", 250);
            // $restaurantImg.css("width", 286);

            $restaurantCardBody = $("<div>");
            $restaurantCardBody.addClass("card-body");

            $restaurantName = $("<h5>");
            $restaurantName.addClass("card-title");
            $restaurantName.text(data[i].restaurantName);
            
            $restaurantDescription = $("<p>");
            $restaurantDescription.addClass("card-text");
            $restaurantDescription.text(data[i].restaurantDescription);

            $restaurantCardBody.append($restaurantName);
            $restaurantCardBody.append($restaurantDescription);

            $restaurantCard.append($restaurantImg);
            $restaurantCard.append($restaurantCardBody);

            $cardWrapper.append($restaurantCard);

            $("#restaurants-div").append($cardWrapper);
        }
        
    }
});