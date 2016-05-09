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
    },
    thankYou: function () {
        console.log("Thank you for shopping with us! Have a look at more of our items");
    },
    invalidPrompt: "Please enter a valid option",
    invalidID: function () {
        console.log("Please enter a valid item ID")
    }
}

var schema = {
    selectAll: {
        properties: {
            itemID: {
                description: dialogue.shopID,
                type: "integer",
                message: dialogue.invalidPrompt,
                required: true
            }
        }
    },
    quantity: {
        properties: {
            quantity: {
                description: dialogue.quantityID,
                type: "integer",
                message: dialogue.invalidPrompt,
                required: true
            }
        }
    }
};

connection.query('SELECT * FROM products', function (err, data) {
    if (err) throw err;

    function displayItems() {
        console.log("Products for sale:")
        dialogue.separate();
        dialogue.space();

        for (var i = 0; i < data.length; i++) {
            console.log("Name: " + data[i].ProductName + "  || Price: $" + data[i].Price + "  || ID: " + data[i].ItemID);
            dialogue.space();
        }
    }

    displayItems();
    prompt.start();

    promptEngine = {
        customerEntersStore: function () {
            prompt.get(schema.selectAll, function (err, result) {
                console.log(result)
                connection.query('SELECT * FROM products WHERE ItemID = ' + result.itemID, function (err, res) {
                    console.log(res)
                    if (res === undefined || res === null) {
                        console.log(res)
                        dialogue.invalidID();
                        promptEngine.customerEntersStore();
                    } else {
                        dialogue.space();
                        promptEngine.customerPurchase(res[0].ProductName, res[0].ItemID, res[0].StockQuantity, res[0].Price, res[0].DepartmentName)
                    }
                });
            })
        },
        customerPurchase: function (passName, passID, passQuantity, passPrice, passDepartment) {
            prompt.get(schema.quantity, function (err, results) {
                if (passQuantity >= results.quantity) {
                    console.log(passName, passID, passQuantity, passPrice, passDepartment)
                    dialogue.space();

                    connection.query("UPDATE products SET products.StockQuantity = " + (passQuantity - results.quantity) + " WHERE ItemID = " + passID, function (error, updateData) {
                        dialogue.thankYou();
                        displayItems();
                        promptEngine.customerEntersStore();
                    });
                } else {
                    dialogue.space();
                    dialogue.supplyLow();
                    promptEngine.customerEntersStore();
                }
            })
        }
    };
    promptEngine.customerEntersStore();
});




