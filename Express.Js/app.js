// can bring this code from the Express Website
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 80;

app.use(bodyParser.urlencoded());

// defining the middleware using the .use() and the next() function is for passing the control to the next middleware
app.use('/add-product', (req, res, next) => {
    res.send(`<form action="/product" method="post">
                <label for="name">Product</label>
                <input type="text" id="name" name="name">
                <label for="size">Size</label>
                <input type="number" id="size" name="size">
                <button type="submit">Submit!</button>
            </form>`);
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('this is the main page');
    // otherwise we would have to write the .write or .read etc.
});

app.listen(port, () => console.log(`Express app listening on port ${port}`));