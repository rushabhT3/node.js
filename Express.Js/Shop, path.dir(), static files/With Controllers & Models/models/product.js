const { fileLoader } = require('ejs');
const fs = require('fs');
const { get } = require('http');
const path = require('path');

// इस line में p variable define किया गया है जो JSON file का path है। 
// path.join function use किया गया है जो arguments को join करके एक valid file path generate krta hain
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => {
    //  fs.readFile function p:file path से file को read करता है।
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            // return products: string but we want the array so JSON.parse
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }
    save() {
        getProductsFromFile(products => {
            // this refers to the class as we are using the arrow function
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    // static se pura class bevajah nahi banega but static se hi hum directly products ko bula sakte
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}

