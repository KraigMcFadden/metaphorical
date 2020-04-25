/* mini names */
const h = {};

let isSynsetsFinished = false;
let isHypernymsFinished = false;

/* readable names */
const hypernyms = h;
const hyponyms = {};
const wordToIdsMap = Object.create(null);  // gotta do it this way to get rid of "constructor" default keyword
const idToWordsMap = {};
const definitions = [];