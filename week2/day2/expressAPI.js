import express from '../../node_modules/express/index.js'
import morgan from '../../node_modules/morgan/index.js'

const app = express();

app.use(morgan("combined"));

const userData = [
    { id: 1, name:'Kunal' }, 
    { id: 2, name:'Pavan' }, 
    { id: 3, name:'Bhandari' }, 
    { id: 4, name:'Abhilesh' }
];

let request = 0;

app.use(express.json());

app.use((req, res, next) => {
    request = request + 1;
    next();
});

app.get('/users',(req, res) => {
    res.status(200).json(userData);
});

app.post('/users',(req, res) => {
    console.log(req.body);
    const { user } = req.body;
    if (!user) {
        return res.status(400).json({ error: 'User name is required' });
    }
    const i = userData[userData.length - 1];
    const newItem = { id: i.id + 1 , name: user };
    userData.push(newItem);
    res.status(201).json(newItem)
});

app.delete('/users/:id',(req, res) => {
    const id = userData.findIndex(i => i.id === parseInt(req.params.id));
    if(id === -1) return res.status(400).send('User id not found')
    userData.splice(id, 1);
    res.status(200).json({"msg":`user deleted`})
});

app.get('/requests', (req, res) => res.status(200).json({"Requests sent":request}));

app.listen(8000, () => console.log("listening at port 8000"));