const http = require('http');
let countMain = 0;
let countAbout = 0;
const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        countMain = countMain + 1;
        console.log(countMain);
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>Добро пожаловать на мой сайт!</h1>\n<a href="/about" >About</a>')
    } else if (req.url === '/about') {
        countAbout = countAbout + 1;
        console.log(countAbout);
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>About</h1>\n<a href="/">Main</a>')
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>Страница не найдена</h1>')
    }
})
const port = 3002;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})