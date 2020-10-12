
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr( index + character.length);
}

var cryptDiv = document.getElementById('crypt');
var cryptBtn = document.getElementById('btn-crypt');

var messageOriginal = cryptDiv.innerHTML;
var isEncrypted = false;
var isEncrypting = false;

cryptBtn.onmouseup=function(){deAndCrypt();};


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;


  while (0 !== currentIndex) {


    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function cryptReplace(message, index) {
  var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,. /{}|\\":<>\?]/);
  if (pattern.test("" + message[index])) {
      return message;
   } else {
      return message.replaceAt(index, Math.random().toString(36).substring(2, 3));
   }
}

function shuffledArrayGenerator(length) {
    var positions = new Array(length);
    for (i = 0; i < length; i++) {
      positions[i] = i;
    }
    return shuffle(positions);
}

function encrypt(message) {
  var cryptCounter = 0;
  var positions = shuffledArrayGenerator(message.length);
  
  var cryptInterval = setInterval(function(){
    if (cryptCounter < message.length) {
      message = cryptReplace(message, positions.pop());
      cryptDiv.innerHTML = message;
      cryptCounter++;
    } else {
      isEncrypted = true;
      cryptBtn.innerHTML = "decrypt";
      cryptBtn.onmouseup=function(){deAndCrypt();};
      cryptCounter = 0;
      clearInterval(cryptInterval);
    }
   }, 0);
  
}

function decrypt(message, original) {
  var cryptCounter = 0;
  var positions = shuffledArrayGenerator(message.length);
  
  var cryptInterval = setInterval(function(){
    if (cryptCounter < message.length) {
      var popped = positions.pop();
      message = message.replaceAt(popped, original[popped]);
      cryptDiv.innerHTML = message;
      cryptCounter++;
    } else {
      isEncrypted = false;
      cryptBtn.innerHTML = "encrypt";
      cryptBtn.onmouseup=function(){deAndCrypt();};
      cryptCounter = 0;
      clearInterval(cryptInterval);
    }
   }, 0);
  
}

function deAndCrypt()  {
  if (isEncrypted) {
    if (messageOriginal.length > 0) {
      cryptBtn.innerHTML = "decrypting …";
      cryptBtn.onmouseup=function(){};
      decrypt(cryptDiv.innerHTML, messageOriginal);
    }
  } else {
    messageOriginal = cryptDiv.innerHTML
    if (messageOriginal != "<br>") {
      cryptBtn.innerHTML = "encrypting …";
      cryptBtn.onmouseup=function(){};
      encrypt(messageOriginal);
    }
  }

}
