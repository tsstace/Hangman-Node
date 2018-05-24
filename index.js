var inquirer = require('inquirer');

var play = require('./play.js');
var word = require('./word.js');


// splash/banner
console.log('===============================================');
console.log('=                                             =');
console.log('=    Hangman - special Clue mystery edition   =');
console.log('=                                             =');
console.log('===============================================');

startGame();

function startGame() {

    // ask if user would like to play
      var msg = 'Want to play?';
    
      inquirer.prompt([{
        type: 'confirm',
        name: 'play',
        message: msg
      }]).then(function(data) {
        if(data.play) {
          // Start a Hangman class, which calls the Hangman method
          var hgm = new Hangman();
        } else {
          console.log('Like the mounties, we always get our man');
        }
      });
    }

function Hangman() {
  //grab a word  
  word.storeWord(play.getWord());
  //set guesses to 10
  this.guesses = 10;
  //display the banner
  this.printHangman();
  //prompt the user for a letter guess
  this.startPrompt();
}

Hangman.prototype.printHangman = function(customMsg) {
  console.log('========================================');
  console.log('          Hangman - Clue edition        ');
  console.log('========================================');
  console.log(' ');
  console.log('Guesses remaining: ' + this.guesses);
  console.log('Letters guessed: ' + word.guessed.join(' ').toUpperCase());
  console.log(' ');
  console.log('Your Word: ' + word.showWord.join(' ').toUpperCase());
  console.log(' ');
  console.log('========================================');
  console.log(' ');
  if(customMsg) {
    console.log(customMsg);
    console.log(' ');
  }

};

Hangman.prototype.startPrompt = function() {

  var self = this;

  // Prompt for letter guess
  inquirer.prompt([
    {
      type: 'input',
      name: 'guess',
      message: 'Please enter a letter: ',
      validate: function(input) {
        // Check if input is longer than one character or not a letter
        if(input.length > 1 || !input.match(/[a-z]/i)) {
          return false;
        }
        return true;
      }
    }
  ]).then(function(userData) {

    if(self.processGuess(userData.guess)) {
      // Win message
      self.printHangman('Well done, Wadsworth! I congratulate you on guessing: ' + word.chosenWord.toUpperCase());
      startGame(1);
    } else if(self.guesses === 0) {
      // Loss message
      self.printHangman('That is what we are trying to find out!  The word was.. ' + word.chosenWord.toUpperCase());
      startGame(1);
    } else {
      // Prompt for next guess
      self.startPrompt();
    }

  });

};

Hangman.prototype.processGuess = function(guess) {

  // Check if letter was already guessed
  if(word.checkGuessed(guess)) {

    // Check if letter guessed is in the word, if so it will return true
    var check = word.checkWord(guess);

    if(check) {
//      var numOfWords = word.progressWord.split(" ").length;
          console.log(play.getWord());
      // If the progressWord array is equal to the chosenWord length, then winner winner
      if(word.progressWord.length === word.chosenWord.length) {
        return true;
      }

      // the letter was in the word
      this.printHangman(guess.toUpperCase() + ' is one step closer to solving the mystery.');
    } else {

      // the letter was not in the word, decrease counter
      this.guesses--;
      this.printHangman(guess.toUpperCase() + ' is just a red herring.');
    }
  } else {
    this.printHangman('That letter has already been entered: ' + guess.toUpperCase() + '!');
  }

  return false;

};

