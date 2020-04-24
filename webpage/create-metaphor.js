/* These functions have example usage for the word dataset.  Note that there is
 no error handling yet, so it should be added before use in production. */

// returns an integer id for a given word (or null if it doesn't exist)
function getIdForWord(word) {
    return wordToIdMap[word.trim().toLowerCase()];
}

// returns a list of words for a given id (or null if the id is invalid)
function getWordsById(id) {
    return idToWordMap[id];
}

// return a definition for a given id (or null if the id is invalid)
function getDefinitionById(id) {
    return definitions[id];
}

// returns a list of hypernyms (word ids) for a given word (or null if the word doesn't exist)
function getHypernymsForWord(word) {
    return getHypernymsById(getIdForWord[word]);
}

// returns a list of hypernyms (word ids) for a given child id (or null if the id is invalid)
function getHypernymsById(id) {
    return hypernyms[id];
}

// returns a list of hyponyms (word ids) for a given parent id (or null if id is invalid)
function getHyponymsById(id) {
    return hyponyms[id];
}

// randomly samples for a child of current synset and returns the ID; returns
// -1 if no such child exists
function findChild(currID) {
    let currSynset = getHypernymsById(currID);
    if (currSynset == null) return -1;
    let m = Math.round(Math.random() * currSynset.length);
    currID = currSynset[m];
}

function findParent(currID) {
    let currSynset = getHyponymsById(currID);
    if (currSynset == null) return -1;
    let m = Math.round(Math.random() * currSynset.length);
    currID = currSynset[m];
}

// main function
function createMetaphor(firstWord='passion', numWords=5, numSteps=10, probToParent=0.5)
{
    let firstWordID = getIdForWord(firstWord);
    document.getElementById("w0").innerHTML = firstWord;
    document.getElementById("d0").innerHTML = getDefinitionById(firstWordID);
    let currID = firstWordID;
    // write outer loop to get numWords # of words
    for (i = 1; i < numWords; i++) {
        // write inner loop to get numSteps # of steps
        for (j = 0; j < numSteps; j++) {
        // select random k between 0 and 1
        let k = Math.random();
        // find parent and update ID
        if (k <= probToParent) {
            let newID = findChild(currID);
            if (newID < 0) newID = findParent(currID);
            currID = newID;
        } else { // find child and update ID
            let newID = findParent(currID);
            if (newID < 0) newID = findChild(currID);
            currID = newID;
            }
        }
        // change inner HTML
        let Words = getWordsById(currID);
        let m = Math.round(Math.random() * Words.length);
        let currWord = Words[m];
        document.getElementById("w" + i).innerHTML = currWord
        document.getElementById("d" + i).innerHTML = getDefinitionById(currID)
    }
}