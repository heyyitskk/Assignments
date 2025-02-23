import express from '../../node_modules/express/index.js'

const app = express();

const todos = [
    { id: 1, task:'Eat' }, 
    { id: 2, task:'Sleep' }, 
    { id: 3, task:'Code' }, 
    { id: 4, task:'Repeat' }
];

let request = 0;

app.use(express.json());

app.use((req, res, next) => {
    request = request + 1;
    next();
});

app.get('/todos',(req, res) => {
    res.status(200).json(todos);
});

app.post('/todos',(req, res) => {
    console.log(req.body);
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    const i = todos[todos.length - 1];
    const newItem = { id: i.id + 1 , task: task };
    todos.push(newItem);
    res.status(201).json(newItem);
});

app.delete('/todos/:id',(req, res) => {
    const id = todos.findIndex(i => i.id === parseInt(req.params.id));
    if(id === -1) return res.status(400).send('task not found');
    todos.splice(id, 1);
    res.status(200).json({"msg":"task deleted"});
});

app.put('/todos/:id',(req, res) => {
    const id = todos.findIndex(i => i.id === parseInt(req.params.id));
    if(id === -1) return res.status(400).send('task not found');
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    todos[id].task = task;
    res.status(200).json({"msg":"task updated"});
});

app.get('/requests', (req, res) => res.status(200).json({"Requests sent":request}));

app.listen(8000, () => console.log("listening at port 8000"));