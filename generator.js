module.exports = function Generator () {

  var alphabet = "abcdefghijklmnopqrstuvwxyz";
// var seed = "";

  function generateWord() {
    var word = "";
    for (var i = 0; i < 64; i++)
      word += alphabet.charAt(Math.floor(Math.random() * alphabet.length) + 1);
    return word;
  }
  var word = generateWord();


  function getAdjacentNumbers (n, length) {
    var numbers = [];
    for (var i = 0; i < length; i++)
      numbers.push({word: n+i});
    return numbers;
  };

  function getHash (data) {
    var hash = 0;
    
    if (data.length == 0) return hash;

    for (i = 0; i < data.length; i++) {
      c = data.charCodeAt(i);
      hash = ((hash<<5)-hash)+c;
      hash = hash & hash; // Convert to  bit integer
    }
  }

  this.getData = function (size) {
    return getAdjacentNumbers(generateWord(), size);
  }

};
