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
    execOptionsLog: function () {
        console.log('1) View Products Sales by Department ' + '\n' + '2) Create New Department ');
    },
    space: function () {
        console.log("");
    },
}