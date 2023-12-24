const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json()); // Use express.json() to parse JSON request bodies
app.use(cors());
let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send();
  } else {
    res.json(todo);
  }
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description, // Fix typo in property name
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]);
  }
});

app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.json(deletedTodo);
  }
});

app.use((req, res, next) => {
  res.status(404).send("The page you're trying to find does not exist");
});

app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
