'use strict';

const fs = require('fs');
const pr = require('process');
const ax = require('axios');

const ref = pr.argv[2];

const cat = function () {
  fs.readFile(ref, 'utf8', function (err, data) {
    if (err) {
      console.log("ERROR >>", ref, '>>', err);
      pr.exit(127);
    }
    console.log('DATA >>', data);
  });
};

const webCat = async function () {
  try {
    const res = await ax.get(ref);
    console.log('DATA >>', res.data);
  } catch (err) {
    console.log('ERROR >>', err);
    process.exit(129);
  }

};

if (ref.startsWith('http')) {
  webCat();
} else {
  cat();
}
