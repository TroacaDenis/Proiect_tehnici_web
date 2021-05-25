// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
///const uuid = require('uuid');
const {
  v4:uuidv4
}=require('uuid');

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/products", (req, res) => {
  const productsList = readProducts();
  const ordersList= readOrders();
  const newProduct = req.body;
  newProduct.id = uuidv4();
  const newProductList = [...productsList, newProduct];
  writeJson(newProductList,ordersList);
  res.json(newProduct);
});
app.post("/orders", (req, res) => {
  const productsList = readProducts();
  const ordersList = readOrders();
  const newOrder = req.body;
  newOrder.id = uuidv4();
  const newOrderList = [...ordersList, newOrder];
  writeJson(productsList,newOrderList);
  res.json(newOrder);
});

// Read One
app.get("/products/:id", (req, res) => {
  const productsList = readProducts();
  const id = req.params.id;
  let idFound = false;
  let foundProduct;

  productsList.forEach(product => {
    if (id === product.id) {
      idFound = true;
      foundProduct = product
    }
  });

  if (idFound) {
    res.json(foundProduct);
  } else {
    res.status(404).send(`Product ${id} was not found`);
  }
});
app.get("/orders/:id", (req, res) => {
  const ordersList = readOrders();
  const id = req.params.id;
  let idFound = false;
  let foundOrder;

  ordersList.forEach(order => {
    if (id === order.id) {
      idFound = true;
      foundOrder = order
    }
  });

  if (idFound) {
    res.json(foundOrder);
  } else {
    res.status(404).send(`Order ${id} was not found`);
  }
});

// Read All
app.get("/products", (req, res) => {
  const productsList = readProducts();
  res.json(productsList);
});
app.get("/orders", (req, res) => {
  const ordersList = readOrders();
  res.json(ordersList);
});

// Update
app.put("/products/:id", (req, res) => {
  const productsList = readProducts();
  const ordersList= readOrders();
  const id = req.params.id;
  const newProduct = req.body;
  newProduct.id = id;
  idFound = false;

  const newProductsList = productsList.map((product) => {
     if (product.id === id) {
       idFound = true;
       return newProduct
     }
    return product
  })
  
  writeJson(newProductsList,ordersList);

  if (idFound) {
    res.json(newProduct);
  } else {
    res.status(404).send(`Product ${id} was not found`);
  }

});
app.put("/orders/:id", (req, res) => {
  const productsList = readProducts();
  const ordersList= readOrders();
  const id = req.params.id;
  const newOrder = req.body;
  newOrder.id = id;
  idFound = false;

  const newOrdersList = ordersList.map((order) => {
     if (order.id === id) {
       idFound = true;
       return newOrder
     }
    return order
  })
  
  writeJson(productsList,newOrdersList);

  if (idFound) {
    res.json(newOrder);
  } else {
    res.status(404).send(`Order ${id} was not found`);
  }

});


// Delete
app.delete("/products/:id", (req, res) => {
  const productsList = readProducts();
  const ordersList= readOrders();
  const id = req.params.id;
  const newProductsList = productsList.filter((product) => product.id !== id)

  if (productsList.length !== newProductsList.length) {
    res.status(200).send(`Product ${id} was removed`);
    writeJson(newProductsList,ordersList);
  } else {
    res.status(404).send(`Product ${id} was not found`);
  }
});
app.delete("/orders/:id", (req, res) => {
  const productsList = readProducts();
  const ordersList= readOrders();
  const id = req.params.id;
  const newOrdersList = ordersList.filter((order) => order.id !== id)

  if (ordersList.length !== newOrdersList.length) {
    res.status(200).send(`Order ${id} was removed`);
    writeJson(productsList,newOrdersList);
  } else {
    res.status(404).send(`Order ${id} was not found`);
  }
});

// Functiile de citire din fisierul db.json
function readProducts() {
  return JSON.parse(fs.readFileSync("db.json"))["products"];
}
function readOrders() {
  return JSON.parse(fs.readFileSync("db.json"))["orders"];
}

// Functiile de scriere in fisierul db.json

function writeJson(prod_content, ord_content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ products: prod_content , orders: ord_content}),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);