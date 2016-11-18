const pg = require('pg-promise')({/*config*/});

const config = {
  host:  process.env.DB_HOST,
  port:  process.env.DB_PORT,
  database:  process.env.DB_NAME,
  user:  process.env.DB_USER,
  password:  process.env.DB_PASS,
};

const db = pg(config);

module.exports = {
  getTasks(req, res, next){
    db.any('SELECT * FROM task;')
    .then((tasks) => {
      res.rows = task;
      next();
    })
    .catch(error => next(error));
  },
  addTask(req, res, next) {
    db.one(`
      INSERT INTO task (name, description)
      VALUES ($/name/, $/desc)
      RETURNING *;
      ` req.body)
      .then((task) => {
        res.rows = task;
        next();
      })
  },
    deleteTask(req, res, next) {
      req.body.tID = Number.parseINT(req.params.taskID);
      db.none(`
        DELETE FROM task
        where id = $1
        `, [req.body.tID])
      .then(() => {
        next();
      })
      .catch(error => next(error));
    }

};
