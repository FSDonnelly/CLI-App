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
    startInquirer(res);
  });
}
//Start asking customer which product and quantity.
function startInquirer(x) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'product',
      message: 'Which product would you like to purchase?(Enter product ID#)'
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Enter the amount you would like to purchase?'
    }
  ]).then(function (inquirerRes) {
    let query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
    connection.query(query, [inquirerRes.quantity, x[inquirerRes.product - 1].item_id], function (err) {
      if (err) throw err;
      // console.log(query,inquirerRes )
      if (x[inquirerRes.product - 1].stock_quantity <= 0 || inquirerRes.quantity > x[inquirerRes.product - 1].stock_quantity) {
        console.log('Insufficient quantity!');
      } else {
        let total = ((x[inquirerRes.product - 1].price) * inquirerRes.quantity).toFixed(2);
        console.log("The total of your purchase is $" + total +
          "\nSuccessfully purchased " + inquirerRes.quantity + ' copy/copies of ' + x[inquirerRes.product - 1].product_name + '.');
      }
    });
    connection.end();
  });
}