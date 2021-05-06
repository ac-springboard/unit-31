/** Command-line tool to generate Markov text. */

const fs = require("fs");
const { MarkovMachine } = require("./markov");
const ax = require("axios");
const pr = require("process");

function makeText(text) {
  let machine = new MarkovMachine(text);
  console.log(`TEXT >> ${machine.makeText()}`);
}

function getText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.log(`ERROR >> ${path} >> ${err}`);
      pr.exit(127);
    }
    makeText(data);
  });

}

async function getTextFromUrl(url) {
  let res;

  try {
    res = await ax.get(url);
    makeText(res.data);
  } catch (err) {
    console.log(`ERROR >> ${url} >> ${err}`);
    pr.exit(128);
  }
}


function init() {

  console.log('ARGV >>', pr.argv);

  const type = pr.argv[2];
  const path = pr.argv[3];

  if (type === "url") {
    getTextFromUrl(path);
  } else if (type === "file") {
    getText(path);
  } else {
    console.error(`ERROR >> ${type}`);
    pr.exit(129);
  }
}

init();
