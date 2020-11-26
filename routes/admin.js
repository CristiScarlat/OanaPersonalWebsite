const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { readDir, getFiles } = require('../utils/filesUtils');
//const dbServices = require('../db/querys');

var storage = multer.diskStorage(
  {
      destination: path.resolve('media/upload'),
      filename: function ( req, file, cb ) {
          cb( null, file.originalname);
      }
  }
);

const upload = multer({ storage: storage})

// async function writeToDB(data) {
//   const date = new Date();
//   console.log(data.albumName, data.albumDescription, date);
//   const resdb = await dbServices.addNewAlbum(data.albumName, data.albumDescription, date);
//   console.log("res-db", resdb);
// }

router.route('/')
.get(async (req, res) => {
    const uploadedPics = await getFiles(path.resolve('media/upload'));
    //const allAlbumNames = await dbServices.getAllAlbums();
    const albumsDir = await readDir(path.resolve('media/albums'));
    console.log("get->", albumsDir, uploadedPics)
    res.render('admin.html', {uploadedPics, albumsDir});
})

.post(upload.array('files'), async (req, res, err) => {
  console.log("post=>", req.body, req.files)
  // req.file is the `files` file
  // req.body will hold the text fields, if there were any
  //await writeToDB(req.body);
  const uploadedPics = await getFiles(path.resolve('media/upload'));
  const albumsDir = await readDir(path.resolve('media'));
  res.render('admin.html', {uploadedPics});
});

module.exports = router;