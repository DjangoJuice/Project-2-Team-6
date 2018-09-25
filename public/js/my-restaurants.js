$(function () {
    getAllOrders();

    function getAllOrders () {
        $.ajax({
            url: "/api/orders/restaurants/1",
            method: "GET"   
        }).then(displayOrders);
    }

    function displayOrders (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            if (!data[i].filled) {
                var price = (data[i].dishPrice * data[i].dishQuantity);

                $Order = $("<div>");
                $Order.addClass("border border-dark mb-2 py-2 rounded")

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
});