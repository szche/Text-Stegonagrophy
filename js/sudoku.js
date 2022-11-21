const textToAscii = (text) => {
  let arr = [];
  for (let i = 0; i < text.length; i++) {
    arr.push(text.charCodeAt(i));
  }
  return arr;
};

const findLongestSentence = (coverText) => {
  let longestSentence = 0;
  const sentences = coverText.split(".");
  sentences.forEach((sentence) => {
    let text = sentence.trim().split(" ");
    if (text.length > longestSentence) {
      longestSentence = text.length;
    }
  });
  return longestSentence;
};

const createCoverTextMatrix = (coverText) => {
  // const N = findLongestSentence(coverText);
  let k = -1;
  const arrOfMatrix = [];
  let matrix = Array.from(Array(9), () => new Array(9));
  const sentences = coverText.split(".");
  // console.log(sentences);
  for (let i = 0; i < sentences.length; i++) {
    k++;
    if (i % 9 == 0 && i != 0) {
      k = 0;
      arrOfMatrix.push(matrix);
      matrix = Array.from(Array(9), () => new Array(9));
    }
    sentences[i] = sentences[i].trim();
    const words = sentences[i].split(" ");
    for (let j = 0; j < words.length; j++) {
      if (j == 9) break;
      const asciiArray = [];
      for (let z = 0; z < words[j].length; z++) {
        if (z == 9) break;
        asciiArray.push(words[j].charCodeAt(z));
      }
      matrix[k][j] = asciiArray;
    }
  }
  return arrOfMatrix;
};

const createSudoku = (coverTextMatrix, secretTextAscii) => {
  let collisionRows = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  };
  let collisionColumns = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  };
  const sudokuArray = [];
  let rowsArr = []; //sentence number
  let columnsArr = []; //word number
  let number = []; //letter number
  let letterCount = 0;
  coverTextMatrix: for (let k = 0; k < coverTextMatrix.length; k++) {
    const sudoku = Array.from(Array(9), () => new Array(9));
    sudokuArray.push(sudoku);
    firstMatrixLoop: for (let i = 0; i < coverTextMatrix[k].length; i++) {
      secondMatrixLoop: for (let j = 0; j < coverTextMatrix[k][i].length; j++) {
        if (!coverTextMatrix[k][i][j]) continue firstMatrixLoop;
        letterLoop: for (let z = 0; z < coverTextMatrix[k][i][j].length; z++) {
          if (asciiArray[letterCount] == coverTextMatrix[k][i][j][z]) {
            let row = 3 * Math.floor(i / 3) + Math.floor(j / 3);
            let column = 3 * (i % 3) + (j % 3);
            console.log(i, j);
            console.log(row, column);
            if (
              collisionRows[row].includes(z) ||
              collisionColumns[column].includes(z) ||
              sudoku[row][column] != null
            ) {
              continue letterLoop;
            }
            sudoku[row][column] = z;
            collisionRows[row].push(z);
            collisionColumns[column].push(z);
            letterCount++;
          }
        }
      }
    }
  }
  if (letterCount != asciiArray.length) {
    new Error("Cover text is too short!");
  }
  return sudokuArray;
};

const revealText = (sudokuArr, coverTextMatrix) => {
  let rowsArr = []; //sentence number
  let columnsArr = []; //word number
  let number = []; //letter number
  for (let k = 0; k < coverTextMatrix.length; k++) {
    console.log(coverTextMatrix[k])
  }
}

const coverText =
  "Having one’s own house is a great blessing of God. One feels good, safe and secure at his home. A house, you know is an important necessity. The quality of life improves when you have a comfortable house of your own. It gives you an opportunity to turn some of your dreams into reality. You decorate your room as per your taste. You look after your garden with trees of fruits. Having one’s own house is a great blessing of God. One feels good, safe and secure at his home. A house, you know is an important necessity. The quality of life improves when you have a comfortable house of your own. It gives you an opportunity to turn some of your dreams into reality. You decorate your room as per your taste. You look after your garden with trees of fruits. Having one’s own house is a great blessing of God. One feels good, safe and secure at his home. A house, you know is an important necessity. The quality of life improves when you have a comfortable house of your own. It gives you an opportunity to turn some of your dreams into reality. You decorate your room as per your taste. You look after your garden with trees of fruits";

const secret = "test";

$("#hide").click(function () {
  var secret = document.getElementById("secret-to-hide").value;
  var cover = document.getElementById("cover-text").value;
  const secretAsciiText = textToAscii(secret);
  const coverMatrix = createCoverTextMatrix(cover);
  const sudokuArr = createSudoku(coverMatrix, secretAsciiText);
  const arrOfTables = [];
  console.log(sudokuArr);
  let k = 0;
  sudokuArr.forEach((matrix) => {
    const table = document.createElement("table");
    arrOfTables.push(table);
    for (let i = 0; i < 9; i++) {
      let row = table.insertRow();
      for (let j = 0; j < 9; j++) {
        let cell = row.insertCell();
        console.log(matrix[i][j]);
        if (!matrix[i][j]) {
          cell.innerText = "";
        } else {
          cell.innerText = matrix[i][j];
        }
      }
    }
  });
  arrOfTables.forEach((table) => {
    document.getElementById("result").appendChild(table);
  });
  revealText(sudokuArr, coverMatrix)
  $("#result-div").fadeIn();
});



// $("#reveal").click(function () {
//   var text = document.getElementById("text-to-reveal").value;
//   hidden_text = reveal(text, LINE_LENGHT);
//   document.getElementById("result").innerText = hidden_text;
//   $("#result-div").fadeIn();
// });
