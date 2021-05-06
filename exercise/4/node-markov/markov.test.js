const {MarkovMachine} = require("./markov");

describe('Markov Machine Tests', () => {
  let text  =  "mama momo mumu mama meme mimi mumu meme momo";
  let tarr  = ["mama", "momo", "mumu", "mama", "meme", "mimi", 'mumu', 'meme', 'momo'];
  let chain = new Map([
    ['mama', ['momo', 'meme']],
    ['momo', ['mumu', null ]],
    ['mumu', ['mama', 'meme']],
    ['meme', ['mimi', 'momo']],
    ['mimi', ['mumu']]
  ]);

  let mama;
  beforeEach(() => {
    mama = new MarkovMachine(text);
  });

  test('Should initialize word array', () => {
    expect(mama.words).toEqual(tarr);
  });

  test('Should make chains', () => {
    mama.makeChains();
    // console.log('MAMA.CHAINS >>', mama.chains);
    // console.log('CHAIN >>', chain);
    expect(mama.chains).toEqual(chain);
  });
});
