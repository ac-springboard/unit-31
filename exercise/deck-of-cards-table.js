class DeckOfCards {

  one_card_endpoint = '/draw/?count=1';

  constructor(base_url, remaining) {
    this.base_url        = base_url;
    this.remaining       = remaining;
    this.getCard         = document.querySelector('#get-card');
    // this.getCard.disabled = true;
    this.getCard.onclick = () => {
      this.getCard.disable = true;
      this.showOneCard();
    };
    this.tc              = document.querySelector('#table-cards');
    this.updateButtonText();
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

  showOneCard() {
    Promise.resolve(this.getOneCard())
           .then((response) => {
             this.appendCardsToSection(response);
             this.remaining = response.data.remaining;
             this.updateButtonText();
           })
           .then(() => this.getCard.disable = false )
           .catch((error) => console.log('ERROR >> ', error));

  }

  appendCardToElem(img_src, klass) {
    const img_tag = document.createElement('img');
    img_tag.src   = img_src;
    img_tag.classList.add(klass);
    window.scrollTo(0, document.querySelector("#table-cards").scrollHeight);
    this.tc.append(img_tag);
  }

  appendCardsToSection(response) {
    const img_src = response.data.cards[0].image;
    this.appendCardToElem(img_src, 'pile');
  }

  updateButtonText() {
    const gc     = document.querySelector('#get-card');
    gc.innerText = `${this.remaining} remaining`;
    if ( this.remaining === 0 ){
      this.getCard.disabled = true;
    }
  }
}

// ANSWER 3
//
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
     .then(() => {
       axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => {
              let base_url = `https://deckofcardsapi.com/api/deck/${response.data.deck_id}`;
              new DeckOfCards(base_url, response.data.remaining);
            });
     });




