var express = require('express');
var router = express.Router();

var mysql= require('mysql');
var db=mysql.createPool({
  host: 'localhost',
  user: 'hikmet',
  port: '3308',
  password: '',
  database: 'crudtest',
  debug: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testconenct', function (reg, res, next) {
  if(db!=null)
  {
    res.send('connect success');
  }
  else
  {
    res.send('connect failed');
  }
});

router.get('/select', function (req, res, next) {
  db.query('SELECT * FROM users', function (err, rs) {
    res.render('select', { user: rs });
  });
});

router.get('/form', function (req, res, next){
  res.render('form');
})

router.post('/form', function (req, res, next){
  db.query('INSERT INTO users SET ?',req.body ,function (err, rs){
    res.redirect('/select');
    console.log(err);
  });
});

router.get('/delete', function (req, res, next){
  db.query('DELETE FROM users WHERE id = ?', req.query.id, function(err, rs){
    res.redirect('/select');
    console.log('id =',req.query.id,' Delete success');
  });
});

router.get('/update', function (req, res, next){
    db.query('SELECT * FROM users WHERE id = ?', req.query.id, function(err, rs){
      res.render('form', {user : rs[0]});
      console.log(rs);
    });
});

router.post('/update', function (req, res, next){
  var param=
  [
    req.body,
    req.query.id
  ]
  db.query('UPDATE users SET ? WHERE id=? ', param, function(err, rs){
    console.log('id =',req.query.id,' users update success');
    res.redirect('select');
  });
});

module.exports = router;
