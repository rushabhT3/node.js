// const http = require('http');

// const server = http.createServer((request, response) => {
//     console.log('harry');
// }).listen(4000);

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url == '/home'){
        res.write('Welcome home');
        res.end();
    } else if (req.url == '/about'){
        res.write('Welcome to About Us page');
        res.end();
    } else if (req.url == '/node'){
        res.write('Welcome to my Node Js project');
        res.end();
    }
}).listen(3000, () => console.log('the server is running'));
