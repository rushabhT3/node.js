const express = require('express');
const app = express();

const port = 80;
// sathwale routes folder me jaa kr admin.js and shop.js ko access karo
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
// access admin file only when /admin is written
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send(`<h2>You picked the wrong house fool!</h2>`);
});

app.listen(port, () => console.log(`Express app listening on port ${port}`));
