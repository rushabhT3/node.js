const http = require('http');

// can bring this code from the Express Website
const express = require('express');
const app = express();
const port = 80;

// defining the middleware using the .use() and the next() function is for passing the control to the next middleware
app.use((req, res, next) => {
    console.log('this the 1st middleware');
    next();
});

app.use((req, res, next) => {
    console.log('this the 2nd middleware');
    res.send('This is the Express way to send the response');
    // otherwise we would have to write the .write or .read etc.
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Express app listening on port ${port}`));
