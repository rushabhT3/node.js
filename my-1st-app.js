const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.write(`<html>
                    <head>
                        <title>YouTube</title>
                    </head>
                    <body>
                        <form action="/message" method="post">
                            <input type="text" name="text" placeholder="Button Dabaye">
                            <button type="submit">Subscribe!</button>
                        </form>
                    </body>
                </html>`)
        return res.end();
    }

    if (req.url = '/message' && req.method == 'POST') {
        let body = '';
        req.on('data', (chunk) => body += chunk.toString());
        req.on('end', () => {
            const message = body.split('=')[1];
            fs.writeFileSync('message.txt', message);
            let text = fs.readFileSync('message.txt', 'utf-8');

            res.write(`<html>
                    <head>
                        <title>YouTube</title>
                    </head>
                    <body>
                        <h4>${text}</h4>
                        <form action="/message" method="post">
                            <input type="text" name="text" placeholder="Button Dabaye">
                            <button type="submit">Subscribe!</button>
                        </form>
                    </body>
                </html>`)
            res.end();
        })
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});