const NUMBER_OF_COLORS = 1;
const NUMBERS_IN_SUDOKU = 20;
const colors = [
  "black",
  "#7D65EC",
  "#6DBD40",
  "#718F60",
  "#EBE95D",
  "#FF7514",
  "#633A34",
  "#2F4538",
  "#FF2301",
  "#D6AE01",
];
let sudokuArr = null;

const textToAscii = (text) => {
  let arr = [];
  for (let i = 0; i < text.length; i++) {
    arr.push(text.toLowerCase().charCodeAt(i));
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
        if (z == 8) break;
        words[j] = words[j].toLowerCase();
        asciiArray.push(words[j].charCodeAt(z));
      }
      if (j < words.length - 1) {
        asciiArray.push(" ".charCodeAt(0));
      } else {
        asciiArray.push(".".charCodeAt(0));
      }
      asciiArray.push;
      matrix[k][j] = asciiArray;
    }
  }
  return arrOfMatrix;
};

const generateRandomIntegerInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const fillWithRandomNumbers = (
  collisionRows,
  collisionColumns,
  sudoku,
  numbers,
  tryCount
) => {
  console.log(numbers);
  for (let z = 0; z < tryCount; z++) {
    if (numbers > NUMBERS_IN_SUDOKU) {
      break;
    }
    const randomColumn = generateRandomIntegerInRange(0, 8);
    const randomRow = generateRandomIntegerInRange(0, 8);
    // console.log(collisionColumns, collisionRows);
    const randomNumber = generateRandomIntegerInRange(1, 9);
    if (
      !collisionRows[randomRow].includes(randomNumber) &&
      !collisionColumns[randomColumn].includes(randomNumber) &&
      sudoku[randomRow][randomColumn] == null
    ) {
      sudoku[randomRow][randomColumn] = {
        number: randomNumber,
        color: "#f59842",
      };
      collisionColumns[randomColumn].push(randomNumber);
      collisionRows[randomRow].push(randomNumber);
      numbers++;
    }
  }
  // return sudoku;
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
  //Loop over arr of coverMatrix
  //Loop over rows and columns of coverMatrix
  //searching for letter

  let loopOverColor = -1;
  let loopOverText = 0;
  let loopOverSudokuArr = 0;
  let numbersInSudoku = 0;
  let lastSudoku = false;
  const sudoku = Array.from(Array(9), () => new Array(9));
  sudokuArray.push(sudoku);
  // console.log(coverTextMatrix);
  // console.log(secretTextAscii);
  //arr of coverTextMatrix
  coverTextMatrix.forEach((arrayCovText) => {
    //Reset color if color = green
    loopOverColor++;
    // console.log(loopOverText, secretTextAscii.length);
    if (loopOverText < secretTextAscii.length) {
      if (loopOverColor == NUMBER_OF_COLORS) {
        console.log("DUPA");
        fillWithRandomNumbers(
          collisionRows,
          collisionColumns,
          sudokuArray[loopOverSudokuArr],
          numbersInSudoku,
          1000
        );
        loopOverColor = 0;
        numbersInSudoku = 0;
        const sudoku = Array.from(Array(9), () => new Array(9));
        sudokuArray.push(sudoku);
        collisionRows = {
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
        collisionColumns = {
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
        loopOverSudokuArr++;
      }
      // console.log(arrayCovText);
      //Loop over columns
      loopOverRows: for (let i = 0; i < arrayCovText.length; i++) {
        loopOverColumns: for (let j = 0; j < arrayCovText[i].length; j++) {
          if (!arrayCovText[i][j]) continue loopOverRows;
          loopOverLetters: for (let k = 0; k < arrayCovText[i][j].length; k++) {
            //Find number
            if (secretTextAscii[loopOverText] == arrayCovText[i][j][k]) {
              const foundNumber = k + 1;
              let row = 3 * Math.floor(i / 3) + Math.floor(j / 3);
              let column = 3 * (i % 3) + (j % 3);
              if (
                !collisionRows[row].includes(foundNumber) &&
                !collisionColumns[column].includes(foundNumber) &&
                sudokuArray[loopOverSudokuArr][row][column] == null
              ) {
                sudokuArray[loopOverSudokuArr][row][column] = {
                  number: foundNumber,
                  color: colors[loopOverColor],
                };
                collisionRows[row].push(foundNumber);
                collisionColumns[column].push(foundNumber);
                loopOverText++;
                numbersInSudoku++;
              }
            }
          }
        }
      }
    } else if (loopOverText == secretTextAscii.length) {
      lastSudoku = true;
      loopOverText++;
    }

    if (lastSudoku) {
      lastSudoku = false;
      // console.log(
      //   collisionRows,
      //   collisionColumns,
      //   sudokuArray[loopOverSudokuArr],
      //   numbersInSudoku,
      //   loopOverSudokuArr
      // );
      fillWithRandomNumbers(
        collisionRows,
        collisionColumns,
        sudokuArray[loopOverSudokuArr],
        numbersInSudoku,
        1000
      );
    }
  });

  if (loopOverText - 1 != secretTextAscii.length) {
    throw new Error("Cover text is too short!");
  }
  return sudokuArray;
};

$("#hide").click(function () {
  var secret = document.getElementById("secret-to-hide").value;
  var cover = document.getElementById("cover-text").value;
  const secretAsciiText = textToAscii(secret);
  const coverMatrix = createCoverTextMatrix(cover);
  document.getElementById("result").innerHTML = null;
  try {
    sudokuArr = createSudoku(coverMatrix, secretAsciiText);
    const arrOfTables = [];

    // console.log(sudokuArr);
    let k = 0;
    sudokuArr.forEach((matrix) => {
      const table = document.createElement("table");
      arrOfTables.push(table);
      for (let i = 0; i < 9; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 9; j++) {
          let cell = row.insertCell();
          if (!matrix[i][j]) {
            cell.innerText = "";
          } else {
            cell.innerText = matrix[i][j].number;
            cell.style.color = matrix[i][j].color;
          }
        }
      }
    });
    arrOfTables.forEach((table) => {
      document.getElementById("result").appendChild(table);
    });
    // revealText(sudokuArr, coverMatrix);
    document.getElementById("copy").classList.remove("disabled");
    $("#result-div").fadeIn();
  } catch (err) {
    const paragraph = document.createElement("p");
    const newContent = document.createTextNode(err);
    paragraph.appendChild(newContent);
    document.getElementById("result").appendChild(paragraph);
  }
});

function printArr(arr) {
  let str = "";
  for (let item of arr) {
    if (Array.isArray(item)) str += printArr(item);
    else str += item + ", ";
  }
  return str;
}

$("#copy").click(function () {
  let copyTextarea = document.createElement("textarea");
  document.body.appendChild(copyTextarea);
  // console.log(sudokuArr);
  copyTextarea.value = JSON.stringify(sudokuArr, null, 2);
  copyTextarea.focus();
  copyTextarea.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful ? "successful" : "unsuccessful";
    document.body.removeChild(copyTextarea);
    // console.log("Copying text command was " + msg);
  } catch (err) {
    // console.log("Oops, unable to copy");
  }
});

$("#reveal").click(function () {
  let cover = document.getElementById("text-to-reveal").value;
  let sudokuArray = JSON.parse(document.getElementById("sudoku-array").value);
  const coverMatrix = createCoverTextMatrix(cover);
  hidden_text = revealText(sudokuArray, coverMatrix);
  document.getElementById("result").innerText = hidden_text;
  $("#result-div").fadeIn();
});

const revealText = (sudokuArr, coverTextMatrix) => {
  //Od Koloru zależy kolejność w coverTextMatrix

  let sudokuLoopCount = 0;
  let coverTextMatrixCount = -1;
  console.log(coverTextMatrix);
  let arrOfCubes = [];
  let cubes = null;
  sudokuArr.forEach((sudoku) => {
    sudokuLoopCount++;
    loopOverColors: for (let k = 0; k < NUMBER_OF_COLORS; k++) {
      coverTextMatrixCount++;
      cubes = Array.from(Array(9), () => new Array());
      arrOfCubes.push(cubes);
      loopOverRows: for (let i = 0; i < 9; i++) {
        loopOverColumns: for (let j = 0; j < 9; j++) {
          // console.log(coverTextMatrix[coverTextMatrixCount]);
          if (sudoku[i][j]) {
            if (sudoku[i][j].color == colors[k]) {
              let cube = 3 * Math.floor(i / 3) + Math.floor(j / 3);
              let order = (i % 3) * 3 + (j % 3);
              let number = sudoku[i][j].number - 1;
              console.log(coverTextMatrixCount, cube, order, number);
              let letter = String.fromCharCode(
                coverTextMatrix[coverTextMatrixCount][cube][order][number]
              );
              cubes[cube].push(letter);
              console.log(letter);
            }
          }
        }
      }
    }
  });
  console.log(arrOfCubes.flat(3));
  let result = arrOfCubes.flat(3).join("");
  console.log(result);
  return result;
};
