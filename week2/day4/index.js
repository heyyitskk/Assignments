const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./db.js');
const User = require('./models/User.js');
const PORT = 3000;

const app = express();
connectDb();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});


app.post('/users', async(req, res) => {
    try {
        // console.log(req.body);
        const { name, email, age, hobbies } = req.body;
        if (!name || !email || !age) {
            return res.status(400).json({ error: 'Name, email, and age are required' });
        }
        const newUser = await User.create({ 
            name: name, 
            email: email, 
            age: age, 
            hobbies: hobbies || []
        });
        console.log(newUser);
        res.status(201).json({ message: `${newUser.name} created successfully`});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {   
        res.status(500).json(error);
    }
});

app.get('/users/:id', async(req, res) => {
    try {       
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/users/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { name, email, age, hobbies } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { name, email, age, hobbies }, 
            { new: true }
        );
        if(!updatedUser){
            return res.status(404).json({ error: "user not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/users/:id', async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            return res.status(404).json({ error: "user not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.listen(PORT, () => console.log("running at http://localhost:3000"));