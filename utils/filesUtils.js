const fs = require('fs');
const util = require('util');
const path = require('path');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

async function readDir(dir) {
  try {
    const allDirs = await readdir(dir);
    const directories = []
    
    await Promise.all(allDirs.map(async (d) => {
      if ((await stat(dir)).isDirectory()) directories.push(d);
    }));
    return directories;
  }
  catch (err) {
    console.log(err);
    return [err]
  }
}

async function getFiles(dir) {
  try {
    return await readdir(dir);
  }
  catch (err) {
    console.log(err);
    return [err]
  }
}


function deleteAllFiles(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dir, file), err => {
        if (err) throw err;
      });
    }
  });
}

module.exports = { readDir, getFiles };