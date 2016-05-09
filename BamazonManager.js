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
    levelOptions: function () {
        console.log('1) View Products for Sale ' + '\n' +
            '2) View Low Inventory ' + '\n' +
            '3) Add to Inventory ' + '\n' +
            '4) Add New Product ');
    },
    space: function () {
        console.log("");
    },
    selectOption: "Please select an option \n",
    invalidOption: "You're request was not valid. Please try again \n",
    restockOption: "What item would you like to restock more of? \n",
    more: {
        askName: "Please enter the item name \n",
        askDepartment: "Please enter the item's department \n",
        askPrice: "Please enter the item price \n",
        askStock: "Please enter the stock quantity \n",
    }

}

var schema = {
    levelPrompt: {
        properties: {
            level: {
                description: dialogue.selectOption,
                type: "integer",
                message: dialogue.invalidOption,
                required: true
            }
        }
    },
    restockPrompt: {
        properties: {
            restock: {
                description: dialogue.restockOption,
                type: "integer",
                message: dialogue.invalidOption,
                required: true
            }
        }
    },
    morePrompt: {
        properties: {
            moreName: {
                description: dialogue.more.askName,
                pattern: /^[a-zA-Z\s\-]+$/,
                type: "string",
                message: dialogue.invalidOption,
                required: true
            },
            moreDepartment: {
                description: dialogue.more.askDepartment,
                pattern: /^[a-zA-Z\s\-]+$/,
                type: "string",
                message: dialogue.invalidOption,
                required: true
            },
            morePrice: {
                description: dialogue.more.askPrice,
                type: "string",
                message: dialogue.invalidOption,
                required: true
            },
            moreStock: {
                description: dialogue.more.askStock,
                type: "string",
                message: dialogue.invalidOption,
                required: true
            }
        }
    },
};

var managerLevelEngine = {
    one: function () {
        connection.query('SELECT * FROM products', function (err, data) {
            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
                console.log("Name: " + data[i].ProductName + "  || Price: $" + data[i].Price + "  || ID: " + data[i].ItemID +
                    "  || Department: " + data[i].DepartmentName + "  || Quantities: " + data[i].StockQuantity);
                dialogue.space();
            }
            managerStart();
        })
    },
    two: function () {
        connection.query('SELECT * FROM products WHERE products.StockQuantity < 5', function (err, data) {
            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
                console.log("Name: " + data[i].ProductName + "  || Price: $" + data[i].Price + "  || ID: " + data[i].ItemID +
                    "  || Department: " + data[i].DepartmentName + "  || Quantities: " + data[i].StockQuantity);
                dialogue.space();
            }
            managerStart();
        })
    },
    three: function (id, stock) {
        connection.query('UPDATE products SET products.StockQuantity', function (err, data) {
            if (err) throw err;
            managerStart();
        })
    },
    four: function (name, depart, setPrice, quant) {
        var post = { ProductName: name, DepartmentName: depart, Price: setPrice, StockQuantity: quant };
        connection.query('INSERT INTO products SET ?', post, function (err, data) {
            if (err) throw err;
            managerStart();
        })
    }
}

function managerStart() {
    dialogue.levelOptions();
    dialogue.space();
    prompt.get(schema.levelPrompt, function (err, results) {
        switch (results.level) {
            case 1:
                managerLevelEngine.one();
                break;
            case 2:
                managerLevelEngine.two();
                break;
            case 3:
                prompt.get(schema.restockPrompt, function (err, results) {
                    managerLevelEngine.three();
                });
                break;
            case 4:
                prompt.get(schema.morePrompt, function (err, results) {
                    managerLevelEngine.four(results.moreName, results.moreDepartment, results.morePrice, results.moreStock);
                });
                break;
        }
    })
}
managerStart();

