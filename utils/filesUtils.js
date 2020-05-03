const fs = require('fs');
const path = require('path');

const readDir = (dir, done) => {
    let dirList = [];   
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if(err)done(err, dirList);
        let list = files.length;
        files.forEach(file => {
            const filePath = path.resolve(dir, file.name);
            fs.stat(filePath, (err, stat) => {
                if(err)done(err, dirList);
                list--;
                if(stat && stat.isDirectory()){
                    dirList.push(file.name);
                    if(list === 0)done(null, dirList);
                }
            })
        });
    }); 
}

module.exports = readDir;