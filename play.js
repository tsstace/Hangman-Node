var fs = require('fs');

function loadList() {
  // load the list of words as an array
  var file = 'words.txt';
  var words = fs.readFileSync(file);
  //console.log(words.toString().split('\n'));
  
  return words.toString().split('\n');
}

function getWord() {

  var wordsArr = loadList();
  return wordsArr[rand(wordsArr.length)].trim(); // Return a random word from the list
}

function rand(len) {
  // Get a random index of the array between 0 and the array length - 1
  return Math.floor(Math.random()*len);
}

module.exports = {
  getWord: getWord
};