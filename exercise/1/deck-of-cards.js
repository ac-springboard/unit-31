class DeckOfCards {

  one_card_endpoint = '/draw/?count=1';

  constructor(base_url) {
    this.base_url        = base_url;
  }

  get() {
    console.log(this.base_url);
  }

  getOneCard = () => {
    return axios({
      method: 'get',
      url   : `${this.base_url}${this.one_card_endpoint}`,
      data  : {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    });
  };

  showOneCard(section) {
    Promise.resolve(this.getOneCard())
           .then((response) => {
             this.appendCardsToSection(section, response);
           })
           .catch((error) => console.log('ERROR >> ', error));

  }

  appendCardToElem(elem, img_src) {
    const img_tag           = document.createElement('img');
    img_tag.src             = img_src;
    elem.append(img_tag);
  }

  appendCardsToSection(section, response) {
    const oc    = document.querySelector('#one-card');
    const omcsd = document.querySelector('#one-more-card-same-deck');

    switch (section) {
      case 'oc': {
        const img_src = response.data.cards[0].image;
        this.appendCardToElem(oc, img_src);
        break;
      }
      case 'omcsd': {
        const img_src = response.data.cards[0].image;
        this.appendCardToElem(omcsd, img_src);
        break;
      }
      default: {
        console.error(`Unknown type ${section}`);
      }
    }
  }
}

// ANSWERS 1 AND 2
//
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
     .then(response => {
       let base_url = `https://deckofcardsapi.com/api/deck/${response.data.deck_id}`;
       let doc      = new DeckOfCards(base_url, response.data.remaining);
       doc.showOneCard('oc');
       doc.showOneCard('omcsd');
     });




