DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2),
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
);

SELECT*FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Samsung 50 inch TV", "Electronics", 427.99, 8);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("XBox One X 1TB", "Electronics", 434.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Flaming Hot Cheetos", "Food/Drink", 4.99, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bose Home Theatre Surround Sound", "Electronics", 1434.99, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Big Desk", "Furniture", 234.99, 9);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Comfy Leather Desk Chair", "Furniture", 144.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Big Fat Sectional Sofa", "Furniture", 1544.99, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Super Strong Coffee 5lb", "Food/Drink", 44.99, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Samsung Laptop for Web Development", "Electronics", 144.99, 35);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Extra Strength Tylenol 150 tablet Bottle", "Medication", 4.99, 35);

