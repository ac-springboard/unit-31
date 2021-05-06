'use strict';

const fs = require('fs');
const pr = require('process');
const ax = require('axios');

const cat = function (source) {
  const content = fs.readFileSync(source, 'utf8', function (err, data) {
    if (err) {
      console.log("ERROR >>", source, '>>', err);
      pr.exit(127);
    }
  });
  return content;
};

const webCat = async function (ref) {
  try {
    const res = await ax.get(ref);
    return res.data;
  } catch (err) {
    console.log('ERROR >>', err);
    process.exit(128);
  }

};

const fileWrite = async function (target, content) {
  return fs.writeFile(target, content, 'utf8', function (err) {
    if (err) {
      console.log("ERROR >>", target, '>>', err);
      pr.exit(129);
    }
    console.log('Content successfully written.');
  });
};

const out = async function (source, target) {
  const getFn = source.startsWith('http') ? webCat : cat;
  const content = await getFn(source);

  if (target) {
    const http_content = await content;
    await fileWrite(target, http_content);
  } else {
    console.log('CONTENT >>', content);
  }
};

if (pr.argv[2] === '--out') {
  out(pr.argv[4], pr.argv[3]);
} else {
  out(pr.argv[2]);
}
