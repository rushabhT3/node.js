const path = require('path');
const express = require('express');
const app = express();

const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const exp = require('constants');

app.use(express.urlencoded({ extended: true }));

// __dirname को path.join() के साथ use करने से 'public' directory का absolute path मिलता है
app.use(express.static(path.join(__dirname, 'public'))); // like "/Users/username/project/public" 

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
