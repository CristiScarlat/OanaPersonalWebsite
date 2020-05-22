const fs = require('fs');
const util = require('util');
const path = require('path');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

async function readDir(dir) {
  try {
    const allDirs = await readdir(dir);
    const directories = []
    await Promise.all(allDirs.map(async (dir) => {
      if((await stat(path.resolve('./media') + '/' + dir)).isDirectory())directories.push(dir);
    })); 
    return directories;
  } 
  catch (err) {
    console.log(err);
    return [err]
  }
}

const getFiles = async (dir) => {
  try{
    return await readdir(dir);
  }
  catch (err) {
    console.log(err);
    return [err]
  }
}

module.exports = { readDir, getFiles };