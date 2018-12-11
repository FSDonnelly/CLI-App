//require inquirer
var inquirer = require('inquirer');
//require mySQL
const mysqlx = require('@mysql/xdevapi');
// Connect to server on localhost
mysqlx
  .getSession({
    user: 'user',
    password: 'password',
    host: 'localhost',
    port: '33060'
  })
  .then(function (session) {
    var db = session.getSchema('test');
    // Use the collection 'my_collection'
    var myColl = db.getCollection('animals_db');
    // Specify wich document to find with Collection.find() and
    // fetch it from the database with .execute()
    return myColl
      .find('name like :param')
      .limit(1)
      .bind('param', 'S%')
      .execute(function (doc) {
        console.log(doc);
      });
  })
  .catch(function (err) {
    // Handle error
  });