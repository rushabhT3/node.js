const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        let text = '';
        if (fs.existsSync('message.txt')) {
            text = fs.readFileSync('message.txt', 'utf-8');
        }
        res.write(`<html>
                        <head>
                            <title>YouTube</title>
                        </head>
                        <body>
                            <h1>${text}</h1>
                            <form action="/message" method="post">
                                <input type="text" name="text" id="text" placeholder="Button Dabaye">
                                <button type="submit">Subscribe!</button>
                            </form>
                        </body>
                    </html>`);
        return res.end();
    }

    if (req.url == '/message' && req.method == 'POST') {
        let body = [];
        req.on('data', chunk => body.push(chunk));

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            const message = body.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
}).listen(8080, () => console.log('this code is running on the port name 8080'));