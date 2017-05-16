var express = require('express');
var router = express.Router();
const db = require('../models')
/* GET home page. */
router.get('/', function(req, res, next) {
  db.Url.findAll()
  .then(data=>{
    res.render('index', { title: 'Url_Shortener',urls:data });
  })  
});

router.post('/short',(req,res,send)=>{
  db.Url.create({
    url:req.body.short
  })
  .then(data=>{
    res.redirect('/')
  })
})

router.get('/:url',(req,res,send)=>{
  db.Url.find({
    where:{
      short_url:req.params.url
    }
  })
  .then(url=>{
    let counter = url.count
    url.updateAttributes({
      count: counter+1
    })
    .then(data=>{
      res.redirect('/')
    })
  })
})

module.exports = router;
