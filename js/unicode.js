function textToBin(text) {
    let length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join("");
}

const checkCapacity = (coverTextLength, secretMessageBits) => {
    if (coverTextLength > secretMessageBits) {
        return true
    } else {
        return false
    }
}

$("#hide").click(function () {
    var secret = document.getElementById("secret-to-hide").value;
    const secretBits = textToBin(secret)
    var cover = document.getElementById("cover-text").value;
    let countWords = [...cover].length
    let wordsWithoutSpaces = [...cover].length
    for (let i = 0; i < countWords; i++) {
        if (cover[i] == " ") {
            wordsWithoutSpaces--;
        }
    }
    wordsWithoutSpaces *= 2;
    console.log(wordsWithoutSpaces)
    if (!checkCapacity(wordsWithoutSpaces, secretBits.length)) {
        alert("Cover text is too short")
    }
});
