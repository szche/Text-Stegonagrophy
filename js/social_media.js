const LINE_LENGHT = 80;
function textToBin(text) {
    var length = text.length,
        output = [];
    for (var i = 0;i < length; i++) {
      var bin = text[i].charCodeAt().toString(2);
      output.push(Array(8-bin.length+1).join("0") + bin);
    } 
    return output.join("");
  }
  
  
  function binaryAgent(str) {
    var binString = '';
    str.split(' ').map(function(bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
      });
    return binString;
}

  
  function hide(cover, secret, length) {
      var final_text = [];
      var line = ""
      var cover_split = cover.split(" ");
      var secret_binary = textToBin(secret).split("").concat(Array(9999).fill('0'));
      //console.log(textToBin(secret));
      var bit_to_hide = secret_binary.shift();
      //Jesli bit_to_hide = 1 to dlugosci linii powinna byc wieksza od length
      //Jesli bit_to_hide = 0 to dlugosc linii powinna byc mniejsza od length
  
      //console.log("Trying to hide", bit_to_hide);
      for(var i=0; i<cover_split.length; i++) {
          var word = cover_split[i];
          var added_line = line + " " + word;
          
          //Bit do ukrycia to 1 i przekroczylismy juz limit linii
          //Linia jest gotowa wiec czyscimy
          if (bit_to_hide == 1 && line.length > length) {
              final_text.push(line);
              line = "";
              bit_to_hide = secret_binary.shift();
  
          }
          //Bit do ukrycia to 0 a obecna linia + nowe slowo przekracza juz limit
          //Linia jest gotowa wiec czyscimy
          else if (bit_to_hide == 0 && line.length + word.length >= length) {
              final_text.push(line);
              line = "";
              bit_to_hide = secret_binary.shift();
          }
          if(line.length == 0) {
              line = line+word;
          }
          else {
              line = line + " " + word;
          }
          
      }
      final_text.push(line);
      return final_text.join("\r\n");
  }
  
  function reveal(text, length) {
      //console.log(text);
      var text_split = text.split("\n");
      //console.log(text_split);
      var hidden = "";
      for(var i=0; i<text_split.length; i++) {
          var line = text_split[i];
          //console.log(line, line.length);
          if(line.length > length) { hidden += "1";}
          else { hidden += "0"; }
      }
      let ascii_message = ""
      let binary_array = hidden.match(/.{1,8}/g);
      //console.log(binary_array);
      for(var i=0; i<binary_array.length; i++) {
        let byte = binary_array[i];
        if( byte.includes('1') ) {
            let result = binaryAgent(byte);
            ascii_message += result;
        }
      }
      return ascii_message;
  
  }
  
  $("#hide").click(function() {
      var secret = document.getElementById("secret-to-hide").value;
      var cover = document.getElementById("cover-text").value;
      hidden_text = hide(cover, secret, LINE_LENGHT);
      document.getElementById("result").innerText = hidden_text;
      $("#result-div").fadeIn();
  });
  
  
  $("#reveal").click(function() {
      var text = document.getElementById("text-to-reveal").value;
      hidden_text = reveal(text, LINE_LENGHT);
      document.getElementById("result").innerText = hidden_text;
      $("#result-div").fadeIn();
  });