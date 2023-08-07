const fs = require("fs");
const path = require("path");

const getProductsFromFile = (cb) => {
  const p = path.join(process.cwd(), "data", "products.json");
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      // console.log(JSON.parse(fileContent.toString()));
      cb(JSON.parse(fileContent.toString()));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      const p = path.join(process.cwd(), "data", "products.json");
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
