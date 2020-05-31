const express = require('express');
const router = express.Router();
const { readDir, getFiles } = require('../utils/filesUtils.js');
const path = require('path');

let data = {};

async function getData() {
  const dirs = await readDir(path.resolve('./media'));
  const files = await Promise.all(dirs.map(async dir => {
    try{
      return await getFiles(path.resolve('./media') + '/' + dir);
    } 
    catch(err){
      console.log(err);
    }
  }));
  data.albums = ['menu1', 'menu2', 'menu3', 'menu4', 'blablablabla', 'dfgachbdsn shog i']// dirs;
  data.pictures = files;
}

getData();

router
  .route('/')
  .get((req, res) => {
    data,
      res.render('index.html', data);
  });

router.route('/pictures').get((req, res) => {
  data,
    res.render('pictures.html', data);
})

router.route('/admin').get((req, res) => {
  data,
    res.render('admin.html', data);
})

module.exports = router;