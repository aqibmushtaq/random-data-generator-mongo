module.exports = function Generator () {

  var alphabet = "abcdefghijklmnopqrstuvwxyz";

  function generateWord() {
    var word = "";
    for (var i = 0; i < 64; i++)
      word += alphabet.charAt(Math.floor(Math.random() * alphabet.length) + 1);
    return word;
  }

  function getAdjacentNumbers (n, length) {
    var numbers = [];
    for (var i = 0; i < length; i++)
      numbers.push({word: n+i});
    return numbers;
  };

  this.getData = function (size) {
    return getAdjacentNumbers(generateWord(), size);
  }

};
