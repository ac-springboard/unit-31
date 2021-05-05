let on   = document.querySelector('#number-facts-ul-one-number');
let mnor = document.querySelector('#number-facts-ul-multiple-numbers-one-request');
let onmr = document.querySelector('#number-facts-ul-one-number-multiple-requests');

// HELPER FUNCTIONS
//

function appendFactToElem(elem, text) {
  const li     = document.createElement('li');
  li.innerHTML = text;
  elem.append(li);
}

function appendFactsToSection(response, section) {
  let html;
  switch (section) {
    case 'on': {
      html = `<li>${response.data.text}</li>`;
      appendFactToElem(on, html);
      break;
    }
    case 'mnor': {
      for (let key in response.data) {
        html = `<li>${response.data[key]}</li>`;
        appendFactToElem(mnor, html);
      }
      break;
    }
    case 'onmr': {
      html = `<li>${response.data.text}</li>`;
      appendFactToElem(onmr, html);
      break;
    }
    default: {
      console.error(`Unknown type ${section}`);
    }
  }
}


function errorHandler(err) {
  switch (err.response.status) {
    case 400: {
      console.warn("Error 400: Don't worry. Just try another number.");
      break;
    }
    case 404: {
      console.warn("Error 404: Don't worry. Just try another number.");
      break;
    }
    default: {
      console.error("I don't know this error. Weird.");
    }
  }
}

function axiosGet(section, url) {
  axios.get(url)
       .then((response) => appendFactsToSection(response, section))
       .catch(err => errorHandler(err))
       .finally(() => console.info('Never stop learning!'));
}

// ANSWER FUNCTIONS
//

function showFactsOneNumber(numb) {
  const url = `http://numbersapi.com/${numb}?json`;
  axiosGet('on', url);
}

function showFactsMultipleNumbersOneRequest(...numbs) {
  const numbs_url = numbs.join(',');
  const url       = `http://numbersapi.com/${numbs_url}`;
  axiosGet('mnor', url);
}

function showFactsOneNumberMultipleRequests(numb, nReqs) {
  const url = `http://numbersapi.com/${numb}?json`;
  for (let i = 0; i < nReqs; i++) {
    axiosGet('onmr', url);
  }
}

// GETTING ANSWERS
//

showFactsOneNumber(7);
showFactsMultipleNumbersOneRequest(1, 2, 3, 5, 7, 9);
showFactsOneNumberMultipleRequests(7, 4);
