const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, "counter.json");
const obj = JSON.parse(fs.readFileSync(pathFile));

// const obj = {
//     "/": 0,
//     '/about': 0
// };

app.get('/', (req, res) => {
    if (req.url === '/') {
        obj.main += 1;
        fs.writeFileSync(pathFile, JSON.stringify(obj, null, 4));
    }
    res.send(`<h1>Корневая страница</h1>\n<h2>Просмотров: ${obj.main}</h2> \n<a href="./about"> Ссылка на страницу /about</a>`);
});
app.get('/about', (req, res) => {
    if (req.url === '/about') {
        obj.about += 1;
        fs.writeFileSync(pathFile, JSON.stringify(obj, null, 4));
    }
    res.send(`<h1>about</h1>\n<h2>Просмотров: ${obj.about}</h2>\n <a href = "./"> main page </a>`);

});



// fs.writeFileSync(pathFile, JSON.stringify(obj, null, 4));

const port = 3003;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})