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
    start(res);
  });
}
function start(){
    inquirer.prompt([{
      type: "list",
      name: "doThing",
      message: "What would you like to do?",
      choices: ["View Product Sales by Department", "Create New Department", "End Session"]
    }]).then(function(ans){
      switch(ans.doThing){
        case "View Product Sales by Department": viewProductByDept();
        break;
        case "Create New Department": createNewDept();
        break;
        case "End Session": console.log('Bye!');
        connection.end();
      }
    });
  }
  
  //view product sales by department
  function viewProductByDept(){
    //prints the items for sale and their details
    connection.query('SELECT * FROM Departments', function(err, res){
      if(err) throw err;
      console.log('>>>>>>Product Sales by Department<<<<<<');
      console.log('----------------------------------------------------------------------------------------------------')
  
      for(var i = 0; i<res.length;i++){
        console.log("Department ID: " + res[i].department_id + " | " + "Department Name: " + res[i].department_name + " | " + "Over Head Cost: " + (res[i].over_head_costs).toFixed(2) + " | " + "Product Sales: " + (res[i].product_sales).toFixed(2) + " | " + "Total Profit: " + (res[i].product_sales - res[i].over_head_costs).toFixed(2));
        console.log('--------------------------------------------------------------------------------------------------')
      }
      // console.table(res)
      })
      start();
    }
  
  
    //create a new department
    function createNewDept(){
      console.log('>>>>>>Creating New Department<<<<<<');
      
      //prompts to add deptName and numbers. if no value is then by default = 0
      inquirer.prompt([
      {
        type: "input",
        name: "department_name",
        message: "Department Name: "
      }, {
        type: "input",
        name: "over_head_costs",
        message: "Over Head Cost: ",
        default: 0,
        validate: function(val){
          if(isNaN(val) === false){return true;}
          else{return false;}
        }
      }, {
        type: "input",
        name: "product_sales",
        message: "Product Sales: ",
        default: 0,
        validate: function(val){
          if(isNaN(val) === false){return true;}
          else{return false;}
        }
      }
      ]).then(function(ans){
          console.log(ans)
        connection.query('INSERT INTO Departments SET ?',[{
          department_name: ans.department_name,
          over_head_costs: ans.over_head_costs,
          product_sales: ans.product_sales
        }], function(err, res){
          if(err) throw err;
          console.log(res)
          console.log('Another department was added.');
        })
        start();
      });
    }
   
  
  