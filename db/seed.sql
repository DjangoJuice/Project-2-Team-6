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