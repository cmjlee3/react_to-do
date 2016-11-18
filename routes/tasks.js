const tasks = require('express').Router();

const showMethod = (req, res) => res.json(`${req.method} tasks/${req.params.taskID}`);
const sendJSONresp = (req, res) => res.json(res.rows);

tasks.route('/:taskID')
  .get(showMethod)
  .put(showMethod)
  .delete(showMethod);

tasks.route('/')
  .get(db.getTasks, sendJSONresp)
  .post(showMethod);


module.exports = tasks;
