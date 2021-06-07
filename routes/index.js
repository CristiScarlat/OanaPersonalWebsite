const express = require('express');
const router = express.Router();
const { readDir, getFiles } = require('../utils/filesUtils.js');
const path = require('path');
const admin = require('./admin');


async function getAllAlbums() {
  let data = {};
  const dirs = await readDir(path.resolve('media/albums'));
  const files = await Promise.all(dirs.map(async dir => {
    try {
      return { [dir]: await getFiles(path.resolve('media/albums' + '/' + dir)) };
    }
    catch (err) {
      console.log("error", err);
      return err;
    }
  }));
  data.albums = dirs;
  data.pictures = files;
  return data;
}

async function getAlbum(album) {
  try {
    return await getFiles(path.resolve('media/albums' + '/' + album));
  }
  catch (err) {
    console.log("error", err);
    return err;
  }
}

router
  .route('/')
  .get(async (req, res) => {
    let data = await getAllAlbums();
    res.render('home.html', data);
  });

router
  .route('/pictures')
  .get(async (req, res) => {
    let pictures = null;
    if (req.query.album) {
      pictures = await getAlbum(req.query.album);
    }
    res.render('pictures.html', { pictures, album: req.query.album });
  });

router.use('/admin', admin);

module.exports = router;