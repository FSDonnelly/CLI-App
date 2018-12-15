//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
require("console.table");
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
})

//Action when connected to server.
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  readProducts();
});
//Displays all the products for sale in a list.
function readProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("Displaying products from Bamazon inventory:");
    console.table(res);
    // start(res);
  });
}