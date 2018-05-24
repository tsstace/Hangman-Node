module.exports = {
    storeWord: function(word) {
      this.chosenWord = word;
      this.guessed = [];
      this.progressWord = [];
      this.showWord = this.getBlanks(); // Get underscores for word length
    },

    checkGuessed: function(guess) {
  
      if(this.guessed.indexOf(guess) !== -1) {
        return false;
      } else {
        this.guessed.push(guess);
        return true;
      }
  
    },

    checkWord: function(guess) {
  
      var check = false;
  
      for(var i=0; i < this.chosenWord.length; i++) {
  
        // If the guess and letter match
        if(guess === this.chosenWord[i]) {
          // Add letter to a separate array to compare later.
          this.progressWord.push(guess);
          this.showWord[i] = guess; // Replace an underscore with a letter
          check = true;
        }
      }
  
      return check;
  
    },
    
    getBlanks: function() {
      arr = [];
  
      for(var i=0; i < this.chosenWord.length; i++) {
        arr.push('_');
      }
  
      return arr;
    },
  };