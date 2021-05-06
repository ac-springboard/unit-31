'use strict';


const fs = require('fs');
const pr = require('process');

/*
// THIS WORKS
const cat = function (path) {
  return new Promise( function(onSuccess, onFailure){
    return fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        console.log("ERROR >>", path, '>>', err);
        pr.exit(127);
      }
      onSuccess(data);
    });
  });
};
const data = cat(pr.argv[2]);
data.then(res => console.log('RES >>', res))
*/

/*
//THIS WORKS
const cat =  async function (path) {
  const cat_prom = new Promise(function (onSuccess, onFailure) {
    return fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        console.log("ERROR >>", path, '>>', err);
        pr.exit(127);
      }
      onSuccess(data);
    });
  });
  return await cat_prom;
};
const data = cat(pr.argv[2]);
Promise.resolve(data).then( res => console.log( 'RES >>', res));
*/

/*
  // THIS WORKS (shell command)
 ╭─acampos@almirum ~/my/courses/spb/unit-31/exercise/3/node-files  ‹master*›
 ╰─➤  node step1 package.json
 DATA >> {
 "name": "node-files",
 "version": "1.0.0",
 "main": "index.js",
 "scripts": {
 "test": "echo \"Error: no test specified\" && exit 1"
 },
 "author": "",
 "license": "ISC",
 "keywords": [],
 "description": ""
 }

 */

const cat  = function (path) {
  fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        console.log("ERROR >>", path, '>>', err);
        pr.exit(127);
      }
      console.log('DATA >>', data);
    });
};
cat(pr.argv[2]);
