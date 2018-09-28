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
                console.log(data[i].dishPrice);
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
                $quantityLabel.attr("for", "quantity-input");
                $quantityLabel.addClass("col-sm-2 col-form-label");
                $quantityLabel.text("Quantity");

                $quantityTextDiv = $("<div>");
                $quantityTextDiv.addClass("col-sm-10");

                $quantity = $("<input>");
                $quantity.attr("type", "text");
                $quantity.attr("value", "1");
                $quantity.attr("id", "quantity-input");
                $quantity.addClass("form-control-plaintext");

                $quantityTextDiv.append($quantity);
                $quantityDiv.append($quantityLabel);
                $quantityDiv.append($quantityTextDiv);

                $notesDiv = $("<div>");
                $notesDiv.addClass("form-group row");

                $notesLabel = $("<label>");
                $notesLabel.attr("for", "notes-input");
                $notesLabel.addClass("col-sm-2 col-form-label");
                $notesLabel.text("Notes");

                $notesTextDiv = $("<div>");
                $notesTextDiv.addClass("col-sm-10");

                $textArea = $("<textarea>");
                $textArea.addClass("form-control");
                $textArea.attr("id", "notes-input");
                $textArea.attr("rows", "3");

                $notesTextDiv.append($textArea);
                $notesDiv.append($notesLabel);
                $notesDiv.append($notesTextDiv);

                $dishSubmitBtn = $("<button>");
                $dishSubmitBtn.addClass("btn btn-sm btn-success form-order-dish-submit");
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
        });

    });

    function showForm() {
        //Injecting Form 
        $form = $("<form>");
        $form.addClass("mb-2 form-to-order")

        $quantityDiv = $("<div>");
        $quantityDiv.addClass("form-group row");

        $quantityLabel = $("<label>");
        $quantityLabel.attr("for", "quantity-input");
        $quantityLabel.addClass("col-sm-2 col-form-label");
        $quantityLabel.text("Quantity");

        $quantityTextDiv = $("<div>");
        $quantityTextDiv.addClass("col-sm-10");

        $quantity = $("<input>");
        $quantity.attr("type", "text");
        $quantity.attr("value", "1");
        $quantity.attr("id", "quantity-input");
        $quantity.addClass("form-control-plaintext");

        $quantityTextDiv.append($quantity);
        $quantityDiv.append($quantityLabel);
        $quantityDiv.append($quantityTextDiv);

        $notesDiv = $("<div>");
        $notesDiv.addClass("form-group row");

        $notesLabel = $("<label>");
        $notesLabel.attr("for", "notes-input");
        $notesLabel.addClass("col-sm-2 col-form-label");
        $notesLabel.text("Notes");

        $notesTextDiv = $("<div>");
        $notesTextDiv.addClass("col-sm-10");

        $textArea = $("<textarea>");
        $textArea.addClass("form-control");
        $textArea.attr("id", "notes-input");
        $textArea.attr("rows", "3");

        $notesTextDiv.append($textArea);
        $notesDiv.append($notesLabel);
        $notesDiv.append($notesTextDiv);

        $dishSubmitBtn = $("<button>");
        $dishSubmitBtn.addClass("btn btn-sm btn-success form-order-dish-submit");
        $dishSubmitBtn.text("Submit");

        $form.append($quantityDiv);
        $form.append($notesDiv);
        $form.append($dishSubmitBtn);
    }
});