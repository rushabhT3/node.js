const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    // admin/ k siwah ye path access nahi hote isliye action me change
    res.send(`<form action="/admin/add-product" method="post">
                <label for="name">Product</label>
                <input type="text" id="name" name="name">
                <label for="size">Size</label>
                <input type="number" id="size" name="size">
                <button type="submit">Submit!</button>
            </form>`);
});

// we can have the get and the post separately for the same url
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
