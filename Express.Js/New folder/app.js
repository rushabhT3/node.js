const path = require('path');
const express = require('express');
const app = express();
const port = 80;

// sathwale routes folder me jaa kr admin.js and shop.js ko access karo
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contact-us')

app.use(express.urlencoded({ extended: true }));
// we use the path module so that it can work in the windows, linux, mac etc.
// यह लाइन `express.static` middleware function का उपयोग करती है static files जैसे कि images, CSS files, और JavaScript files serve करने के लिए।
// इसका मतलब है कि अगर आपके `public` directory में `image.jpg` file होती, तो आप उसे `http://localhost:80/image.jpg` URL से access कर सकते होते
app.use(express.static(path.join(__dirname, 'public')));

// access admin file only when /admin is written
app.use('/admin', adminRoutes); // '/admin' route prefix सेट करते हैं
app.use(shopRoutes);
app.use(contactRoutes);

// isko success.html wali file bhejo jo ki views me hain
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'))
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
});

app.listen(port, () => console.log(`Express app listening on port ${port}`));
