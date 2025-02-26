const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

const users = [];

const JWT_SECRET = 'myjwtsecret';

const authenticateUser = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if(authorizationHeader){
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else{
        res.sendStatus(401);
    }
}

app.post('/sign-up', async (req, res) => {
    const { username, password } = req.body;
    if(users.find(u => u.username === username)){
        return res.status(403).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username: username, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: "User created successfully!" });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if(!user){
        return res.status(400).json({ message: "Invalid username or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign( { username: user.username }, JWT_SECRET);
    res.json({ token });
});

app.get('/profile', authenticateUser, (req, res) => {
    const user = req.user.username;
    res.json({ user: user });
});

app.listen(PORT, console.log("listening at http://localhost:3000"));