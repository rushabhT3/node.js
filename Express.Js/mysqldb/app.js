const path = require('path');
const express = require('express');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product = require('./models/product')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      // Once we have the user, we're attaching it to the request object (req.user = user) so that it can be accessed 
      // by any subsequent middleware functions or route handlers.
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Product and the User have the association/relationship: we are working with those associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// creates tables in the database based on the models you have defined in your code
// .sync() function creates database tables based on the models
// {force: true}: already existing tables with same name, will be deleted and recreated.
// This code uses Sequelize to synchronize the defined models with the database. 
sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      // creates a new instance of the User model and adds it to the database. 
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    app.listen(80);
  })
  .catch(err => {
    console.log(err);
  });
