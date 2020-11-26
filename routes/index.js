const express = require('express');
const router = express.Router();
const { readDir, getFiles } = require('../utils/filesUtils.js');
const path = require('path');
const admin = require('./admin');


async function getData() {
  let data = {};
  const dirs = await readDir(path.resolve('media/albums'));
  const files = await Promise.all(dirs.map(async dir => {
    try {
      return {[dir]: await getFiles(path.resolve('media/albums' + '/' + dir))};
    }
    catch (err) {
      console.log("error",err);
      return err;
    }
  }));
  data.albums = dirs;
  data.pictures = files;
  return data;
} 

router
  .route('/')
  .get(async(req, res) => {
    let data = await getData();
    res.render('home.html', data);
  });

router.route('/pictures').get((req, res) => {
  data,
    res.render('pictures.html', data);
});

router.use('/admin', admin);

module.exports = router;