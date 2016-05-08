CREATE TABLE Products
(
ItemID int NOT NULL AUTO_INCREMENT,
ProductName varchar(255) NOT NULL,
DepartmentName varchar(255),
Price varchar(255),
StockQuantity varchar(255),
PRIMARY KEY (ItemID)
);

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Soap', 'Cleaning', '4.99', '4');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Detergent', 'Cleaning', '6', '2');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Shirt', 'Clothing', '2.30', '7');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Pant', 'Clothing', '4', '10');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Fish', 'Food', '6', '3.99');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Orange Juice', 'Food', '6', '1');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Tent', 'Outdoors', '6', '3');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Flashlight', 'Outdoors', '16', '9');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Eyeliner', 'Beauty', '26', '5');

INSERT INTO Products (ProductName,DepartmentName,Price, StockQuantity)
VALUES ('Blush', 'Beauty', '17', '1');