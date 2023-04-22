const path = require('path');

const express = require('express');

//  variable main module के directory name को contain करेगा।
// यह लाइन const rootDir = require('../util/path'); ../util/path module से export किया गया value को इम्पोर्ट कर रही है।
const rootDir = require('../util/path');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    // admin/ k siwah ye path access nahi hote isliye action me change
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));;
});

// we can have the get and the post separately for the same url
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;