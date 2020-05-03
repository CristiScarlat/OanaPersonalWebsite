const express = require('express');
const router = express.Router();
const readDir = require('../utils/filesUtils.js');
const path = require('path');

let albums = []
readDir(path.resolve('./media'), (err, result) => albums = result);

router
  .route('/')
  .get((req, res) => {
    let data = {
      albums: albums
    };
    res.render('index.html', data);
  });

module.exports = router;