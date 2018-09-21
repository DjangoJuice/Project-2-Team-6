--Grapes_DB--
USE Grapes_DB;

---Restaurant Table Seed Data---

INSERT INTO Restaurants (restaurantName, restaurantAddress, restaurantImg, restaurantDescription, createdAt, updatedAt) VALUES ("Zinburger Wine & Burger Bar", "8030 Renaissance Pkwy #905, Durham, NC 27713","https://images.unsplash.com/photo-1531947398206-60f8e97f34a2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=981b88e56d0d329347e68f1831a57b08&auto=format&fit=crop&w=1000&q=80", "Hip, modern chain serving creative gourmet burgers & shakes, plus wine, local beers & cocktails.", "2018-09-21", "2018-09-21");

INSERT INTO Restaurants (restaurantName, restaurantAddress, restaurantImg, restaurantDescription, createdAt, updatedAt) VALUES ("Thai Cafe", "2501 University Dr, Durham, NC 27707","https://images.unsplash.com/photo-1534345115699-7be8b13815ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77a0221b3741bcf490ba382a9d6f3b0f&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb", "Family-run spot serving standard Thai dishes plus sushi in a polished, laid-back setting.", "2018-09-21", "2018-09-21");

--"Table" MySQL Table Seed Data--
    --ZinBurger RestaurantId = 1--
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 1", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 2", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 3", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 4", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 5", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 6", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 7", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 8", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 9", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 10", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 11", 1); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 12", 1); 
    --Thai Cafe RestaurantId = 2--
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 1", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 2", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 3", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 4", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 5", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 6", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 7", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 8", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 9", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 10", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 11", 2); 
    INSERT INTO Tables (tableNum, RestaurantId) VALUES("Table 12", 2); 

--Dish Table Seed Data--
    --Menu for RestaurantId = 1--
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("SAMBURGER", "Applewood Smoked Bacon, American Cheese, Lettuce & 1,000 Island", "Entree", 12.00, 1);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("THE DOUBLE", "Two 3.5 oz. Patties, Double American Cheese, Minced Onion, Lettuce, Ketchup & Mayo", "Entree", 10.50, 1);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("RINGER", "Applewood Smoked Bacon, Pepper Jack Cheese, Onion Rings, Lettuce, Mayo & Frank’s RedHot", "Entree", 11.50, 1);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("SPIKED RASPBERRY LEMONADE", "GREY GOOSE® Vodka, Signature House-Made Lemonade, Simple Syrup, Fresh Raspberry & Fresh Lemon", "Drinks", 7.00, 1);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("CHOCOLATE CHIP COOKIE DOUGH", "Vanilla Ice Cream, Milk, Chocolate Chip Cookie Dough, Chocolate Chip Cookies, Mini-Chocolate Chips,", "Drinks", 4.50, 1);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("ONION RINGS", "Comes with your choice of sauce.", "Side", 6.00, 1);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("Triple Chocolate", "This isn't your momma's birthday cake.", "Desert", 10.50, 1);

    --Menu for RestaurantId = 2--
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("Egg Rolls", "Three homemade and crispy fried vegetarian spring rolls with Thai Cafe's sweet and sour sauce.", "Side", 3.95, 2);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("Thai Salad", "Fresh romaine lettuce, tomato, cucumber and sliced boiled egg and bean sprouts served with homemade peanut dressing.", "Side", 6.95, 2);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("Pad Thai", "Most popular noodle dish of Thailand, thin rice noodle pan fried with shrimp, egg, scallions, bean sprouts and peanuts. Choice of Chicken, Pork, Tofu or Vegetable.", "Entree", 12.95, 2);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("Panang (red curry)", "Our popular currywith kiffir lime leaves, bell pepper, and basil. Delicious! Choice of Chicken, Pork, Tofu or Vegetable.", "Entree", 12.95, 2);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("CHOCOLATE CHIP COOKIE DOUGH", "Vanilla Ice Cream, Milk, Chocolate Chip Cookie Dough, Chocolate Chip Cookies, Mini-Chocolate Chips,", "Drinks", 4.50, 2);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("Thai Iced Tea", "This isn't your momma's sweet tea.", "Drinks", 2.25, 2);
    INSERT INTO Dishes (dishName, dishDescription, category, dishPrice, RestaurantId) VALUES ("Shu She Salmon", "fresh salmon filet topped with red shu she curry sauce, straw mushroom, bell peppers and basil leaves.", "Entree", 18.95, 2);

--User Table Seed Data--
--email: grapesongrams@gmail.com password: Grapes333!--

INSERT INTO Users (email, password, createdAt, updatedAt) VALUES ("grapesongrams@gmail.com", "Grapes333!", "2018-09-21", "2018-09-21");

--Customer Table Seed Data--

INSERT INTO Customers(customerName, customerPhone) VALUES ("Gee", "555-555-5555", 1);