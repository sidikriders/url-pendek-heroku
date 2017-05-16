var express = require('express');
var router = express.Router();
const db = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.url_list.findAll()
  .then( data => {
    res.render('index', {data:data})
  })
});

router.get('/create-new', function(req, res, next) {
  res.render('add-new')

});

router.post('/', function(req, res, next) {
  let url = req.body.url
  db.url_list.create({
    url: url,
    count: 0
  }).then( data => {
    res.redirect('/')
  })
});

router.get('/del/:id', function(req, res, next) {
  let aidi = req.params.id;
  db.url_list.destroy({
    where: {
      id: aidi
    }
  }).then(data => {
    res.redirect('/')
  })
})

router.get('/:count/:input', function(req, res, next) {
  let input = req.params.input.split('=');
  let aidi = input[0];
  let countBaru = req.params.count
  db.url_list.update({
    count: +countBaru + 1
  }, {
    where: {
      id: aidi
    }
  }).then(() => {
    res.redirect('/'+input.join('='))
  })

router.get('/:input', function(req, res, next) {
  let input = req.params.input.split('=');
  let aidi = input[0];
  db.url_list.find({
    where: {
      id: aidi
    }
  }).then( data => {
    res.redirect(data.url)
  })
})


})

module.exports = router;
