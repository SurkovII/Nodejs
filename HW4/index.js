const express = require('express');
const app = express();
app.use(express.json());

const fs = require('fs');
const path = require('path');
const joi = require('joi');
const { error } = require('console');
/**
 * Валидация, создаем схему
 */
const userSchema = joi.object({
    name: joi.string().min(1).required(),
    surname: joi.string().min(1).required(),
    age: joi.number().min(0).required(),
    city: joi.string().min(1)
})
const pathFile = path.join(__dirname, "users.json");
let uniqueID = 3;
// const obj = {
//     id: 1,
//     name: "Ivan",
//     surname: "Ivanov",
//     age: 30,
//     city: "Moscow"
// };
// fs.writeFileSync(pathFile, JSON.stringify(obj, null, 4));
// const users = fs.readFileSync(pathFile);

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    res.send({ users });
});
app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find((item) => item.id === Number(req.params.id));
    if (user) {
        res.send({ user });

    } else {
        res.status(400).send({
            user: null,
            error: "User not founD",
            status: "error"
        })
    }
});
app.put('/users/:id', (req, res) => {
    const result = userSchema.validate(req.body)
    if (result.error) {
        return res.status(404).send({ error: result.error.details, status: "error" })
    }
    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find((item) => item.id === Number(req.params.id));
    if (user) {
        user.name = req.body.name
        user.surname = req.body.surname
        user.age = req.body.age
        user.city = req.body.city
        fs.writeFileSync(pathFile, JSON.stringify(users, null, 4))
        res.send({ user });

    } else {
        res.status(400).send({
            user: null,
            error: "User not founD",
            status: "error"
        })
    }
});
app.post('/users', (req, res) => {
    const result = userSchema.validate(req.body)
    if (result.error) {
        return res.status(404).send({ error: result.error.details, status: "error" })
    }
    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = {
        id: uniqueID++,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        city: req.body.city
    }
    users.push(user);
    fs.writeFileSync(pathFile, JSON.stringify(users, null, 4))

    res.send({ user });
});
app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    const userIndex = users.findIndex((item) => item.id === Number(req.params.id));
    if (userIndex > -1) {
        users.splice(userIndex, 1);
        fs.writeFileSync(pathFile, JSON.stringify(users, null, 4))
        res.send({ status: "ok" });

    } else {
        res.status(400).send({
            user: null,
            error: "User not founD",
            status: "error"
        })
    }
});

const port = 3003;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})