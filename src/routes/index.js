const { render } = require('ejs');
const { Router } = require('express');
const router = Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index', {
    tasks
  });
});

router.post('/add', async (req, res) => {
  const task = Task(req.body);
  await task.save();
  res.redirect('/');
});


router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render('edit', {
    task
  });
  console.log(task);
});
router.post('/update/:id', async (req, res) => {
  console.log('estoy en upodate');
  const { id } = req.params;
  const task = req.body;
  await Task.update({ _id: id }, req.body);
  res.redirect('/');
});



router.get('/turn/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();

  console.log(task);
  res.redirect('/');

});

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect('/');

});
module.exports = router;