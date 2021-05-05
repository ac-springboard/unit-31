class DeckOfCards {

  one_card_endpoint = '/draw/?count=1';

  constructor(base_url) {
    this.base_url = base_url;
  }

  get() {
    console.log(this.base_url);
  }

  getOneCard = () => {
    return $.getJSON(`${this.base_url}${this.one_card_endpoint}`);
  };

  async showOneCard(section) {
    let response = await this.getOneCard();
    this.appendCardsToSection(section, response);

  }

  appendCardToElem(elem, img_src) {
    const img_tag = document.createElement('img');
    img_tag.src   = img_src;
    elem.append(img_tag);
  }

  appendCardsToSection(section, response) {
    const oc    = document.querySelector('#one-card');
    const omcsd = document.querySelector('#one-more-card-same-deck');

    switch (section) {
      case 'oc': {
        const img_src = response.cards[0].image;
        this.appendCardToElem(oc, img_src);
        break;
      }
      case 'omcsd': {
        const img_src = response.cards[0].image;
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
$(async function () {
  const response = await $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  let base_url   = `https://deckofcardsapi.com/api/deck/${response.deck_id}`;
  const doc      = new DeckOfCards(base_url, response.remaining);
  await doc.showOneCard('oc');
  await doc.showOneCard('omcsd');
});




