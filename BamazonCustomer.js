var mysql = require('mysql');
var prompt = require('prompt');

//create sql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'o98HY^%',
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

    console.log("PRODUCTS FOR SALE:")
    dialogue.separate();
    dialogue.space();

    for (var i = 0; i < data.length; i++) {
        console.log("Name: " + data[i].ProductName + "  || Price: $" + data[i].Price + "  || ID: " + data[i].ItemID);
        dialogue.space();
    }
    prompt.start();

    prompt.get(schema, function (err, result) {
        connection.query('SELECT * FROM products WHERE ItemID = ' + result.itemID, function (err, res) {

            if (res[0].StockQuantity >= result.quantity) {
                dialogue.space();
                console.log("Your order total is: $ " + result.quantity * res[0].Price)

                connection.query("UPDATE products SET products.StockQuantity = " + (res[0].StockQuantity - result.quantity) + " WHERE ItemID = " + result.itemID, function (error, updateData) {
                    if (error) throw error;
                });
            } else {
                dialogue.space();
                dialogue.supplyLow();
            }
        })
    });
});




