// module.exports = function Product() {
    // using the function here
// } OR

// जब server restart होता है और फिर से empty array से initialize किया जाता है।
const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        // this refers to the object created by the class
        products.push(this);
    }

    // static se pura class bevajah nahi banega but static se hi hum directly products ko bula sakte
    static fetchAll() {
        return products;
    }
}

