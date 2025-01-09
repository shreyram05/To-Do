const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
const tasks = [];
app.get('/', (req, res) => {
  res.render('index', { tasks });
});
app.post('/add-task', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push({ id: uuidv4(), text: task, completed: false });
  }
  res.redirect('/');
});
app.post('/complete-task', (req, res) => {
  const { taskId } = req.body;
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = true;
  }
  res.redirect('/');
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
