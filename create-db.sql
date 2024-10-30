# colors
CREATE TABLE colors (
    id INT NOT NULL AUTO_INCREMENT,
    colorName VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE = INNODB;
INSERT INTO colors(colorName)
VALUES("Red");
# products
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(300) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    colorID INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (colorID) REFERENCES colors(id)
) ENGINE = INNODB;
INSERT INTO products(name, price, colorID)
VALUES("Lorem Ipsum", 15.99, 1);