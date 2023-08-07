const fs = require("fs");
const path = require("path");
const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(process.cwd(), "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (err) {
        console.log(err);
      } else {
        // console.log(fileContent);
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(process.cwd(), "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        // console.log(JSON.parse(fileContent.toString()));
        cb(JSON.parse(fileContent));
      }
    });
  }
};
