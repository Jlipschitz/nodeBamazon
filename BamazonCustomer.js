var mysql = require('mysql');
var prompt = require('prompt');

//create sql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon'
});

var dialogue = {
    space: function () {
        console.log("");
    },
    separate: function () {
        console.log("------------------")
    },
    shopID: "Enter the ID of the item you would like to purchase",
    quantityID: "Enter the quantity you would like to purchase",
    supplyLow: function () {
        console.log("Insufficient quantity, sorry!");
    },
    thankYou: function () {
        console.log("Thank you for shopping with us! Have a look at more of our items");
    }
}
var schema = {
    properties: {
        itemID: {
            description: dialogue.shopID,
            type: "integer",
            message: dialogue.shopID,
            required: true
        },
        quantity: {
            description: dialogue.quantityID,
            type: "integer",
            message: dialogue.quantityID,
            required: true
        }
    }
};

connection.query('SELECT * FROM products', function (err, data) {
    if (err) throw err;

    function displayItems() {
        dialogue.separate();
        dialogue.space();

        for (var i = 0; i < data.length; i++) {
            console.log("Name: " + data[i].ProductName + "  || Price: $" + data[i].Price + "  || ID: " + data[i].ItemID);
            dialogue.space();
        }
    }
    console.log("Products for sale:")
    displayItems();
    prompt.start();

    function customerEntersStore() {
        prompt.get(schema, function (err, result) {
            connection.query('SELECT * FROM products WHERE ItemID = ' + result.itemID, function (err, res) {

                if (res[0].StockQuantity >= result.quantity) {
                    dialogue.space();
                    console.log("Your order total is: $ " + result.quantity * res[0].Price)

                    connection.query("UPDATE products SET products.StockQuantity = " + (res[0].StockQuantity - result.quantity) + " WHERE ItemID = " + result.itemID, function (error, updateData) {
                        if (error) throw error;
                        dialogue.thankYou();
                        displayItems();
                        customerEntersStore();
                    });
                } else {
                    dialogue.space();
                    dialogue.supplyLow();
                    customerEntersStore();
                }
            })
        });
    }
    customerEntersStore();
});




