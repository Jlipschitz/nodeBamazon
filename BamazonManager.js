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
    options:
    '1) View Products for Sale ' + '\n' +
    '2) View Low Inventory ' + '\n' +
    '3) Add to Inventory ' + '\n' +
    '4) Add New Product '
    ,
    selectOption: "Please select an option",
    invalidOption: "You're request was not valid. Please try again."
}

var schema = {
    properties: {
        itemID: {
            description: dialogue.selectOption,
            type: "integer",
            message: dialogue.invalidOption,
            required: true
        }
    }
};
var schema2 = {
    quantity: {
        description: dialogue.quantityID,
        type: "integer",
        message: dialogue.invalidOption,
        required: true
    }
}

var managerLevel = {
    one: function () {

    },
    two: function () {

    },
    three: function () {

    },
    four: function () {

    }
}
