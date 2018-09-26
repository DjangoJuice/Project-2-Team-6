

      
         // ARGUMENTS:
         // clientType: 
         //   Can be 0 or "customer" for customer, or 1 or "restaurant" for restaurant
         // svgObject:
         //   Should be reference to svg UI object
         // tableInfo: this can either be array that holds the table states, or an integer representing the number of tables
         //    If an integer is provided, all tables will default to empty/available
         //
         //   The valid table states for a customer are 0 (available) or 1 (taken), and for the kitchen they are:
         //   0 - Table is empty/available
         //   1 - Table is claimed, but food order has not been placed yet
         //   2 - Table has placed order and is waiting on food
         //   3 - Table has received some food, but not ALL food
         //   4 - Table has received ALL food, but needs to pay
         //   5 - Table has paid for food, but has not left the table (this state is not currently used, but may be in the future)

      
      function TableManagementSystem(clientType, svgObject, tableInfo) {
         this.clientType = (clientType === 0 || (clientType.toLowerCase() === "customer")) ? 0 : 1;
         //console.log(this.clientType);
         this.svg = svgObject;
         this.tables = this.initTables(tableInfo);
         this.KITCHEN_COLORS = ["#00A86b","maroon","darkred","#CC3300","#ff2400"]; // green, maroon, dark red, orange red, bright red
         this.CUSTOMER_COLORS = ["#00A86b", "#ff2400"]; // green, bright red
         this.TABLE_ID_PREFIX = "tb";
         this.updateUI();

      }


      TableManagementSystem.prototype.initTables = function (tableInfo) {
         if (Array.isArray(tableInfo)) { // if tableInfo is an array
            return tableInfo;
         } else { // else, tableInfo is an integer representing the number of tables, init them all to state 0
            var tableStates = [];
            var i;

            for (i = 0; i < tableInfo; i++) {
               tableStates.push(0);
            }

            return tableStates;
         }

      };

      TableManagementSystem.prototype.updateUI = function (optionalTableNumber) {
         var colors = (this.clientType === 0) ? this.CUSTOMER_COLORS : this.KITCHEN_COLORS;
         //console.log("new colors are ", colors);
         var newColor;
         var updateUI_singleTable = (tableNum) => {
            newColor = colors[this.tables[tableNum - 1]];
            //console.log("new color is ", newColor)
            this.svg.querySelector("#t" + tableNum).style.fill = newColor;
         };
         var updateUI_allTables = (tableState, tableIndex, tableArr) => {
            newColor = colors[tableState];
            this.svg.querySelector("#t" + (tableIndex + 1)).style.fill = newColor;
         };

         if (optionalTableNumber) {
            updateUI_singleTable(optionalTableNumber);
         } else {
            this.tables.forEach(updateUI_allTables);
         }
      };

      TableManagementSystem.prototype.getTable = function (tableNumber) {
         return this.tables[tableNumber - 1];
      };

      TableManagementSystem.prototype.getTables = function () {
         return this.tables;
      };

      TableManagementSystem.prototype.setTable = function (tableNumber, tableState) {
         this.tables[tableNumber - 1] = tableState;
         this.updateUI(tableNumber);
      };

      TableManagementSystem.prototype.updateTable = TableManagementSystem.prototype.setTable;
      TableManagementSystem.prototype.setTables = function (newTableStates) {
         this.tables = newTableStates;
         this.updateUI();
      };

      TableManagementSystem.prototype.updateTables = TableManagementSystem.prototype.setTables;
      TableManagementSystem.prototype.clearTable = function (tableNumber) {
         this.setTable(tableNumber, 0);
         this.updateUI(tableNumber);
      };

      TableManagementSystem.prototype.clearAllTables = function () {
         this.tables.map(num => 0);
         this.updateUI();
      };

      TableManagementSystem.prototype.claimTable = function (tableNumber) {
         this.setTable(tableNumber, 1);
         this.updateUI(tableNumber);
      };

      TableManagementSystem.prototype.takeTableOrder = TableManagementSystem.prototype.claimTable;
      TableManagementSystem.prototype.takeTableOrder = function (tableNumber) {
         this.setTable(tableNumber, 2);
         this.updateUI(tableNumber);
      };

      TableManagementSystem.prototype.receiveTableOrder = TableManagementSystem.prototype.takeTableOrder;
      TableManagementSystem.prototype.serveTable = function (tableNumber) {
         this.setTable(tableNumber, 3);
         this.updateUI(tableNumber);
      };

      TableManagementSystem.prototype.advanceTable = function (tableNumber) {
         var maxState = (this.clientType === 0) ? 1 : 3;
         var tableState = this.tables[tableNumber - 1];

         tableState = (tableState === maxState) ? 0 : tableState + 1;
         this.setTable(tableNumber, tableState);
      };

      TableManagementSystem.prototype.getNumberFromString = function (str) {
         var newVal = str.replace(/[^0-9]/gi,"");
         return parseInt(newVal);
      };
      

      TableManagementSystem.prototype.createTableId = function (num) {
         return ("" + this.TABLE_ID_PREFIX + num);
      };