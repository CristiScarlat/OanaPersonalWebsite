const express = require('express');
const router = express.Router();

// let index = require('../modules/index.js');

router
  .route('/')
  .get((req, res) => {
    let data = {
      title: 'Nunjucks',
      sub: 'Using nunjucks - cristi'
    };
    res.render('index.html', data);
  });

module.exports = router;