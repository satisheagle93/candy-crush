document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8; //number of columns and rows
  const squares = []; //every div that is created
  let score = 0;

  const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];
  //Create Board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      //making each square draggable and giving id to each square
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      //giving a random color or number to the div being created
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();
  //Drag the candies: adding 6 inbuilt functions

  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingReplaced;
  let squareIdBeingDragged;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart)); //for each element in squares array,when that element has an event listener,there are 6 functions we can invoke
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged);
    console.log(this.id, "dragstart");
  }
  //dragging over a different square
  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragover");
  }
  //dragging while entering a square
  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragenter");
  }

  function dragLeave() {
    console.log(this.id, "dragleave");
  }

  function dragDrop() {
    console.log(this.id, "dragdrop");
    colorBeingReplaced = this.style.backgroundColor; //storing the color of the square it is being moved to
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced; //background color of the square id will be changed with the color being replaced
  }

  //defining a valid move
  function dragEnd() {
    console.log(this.id, "dragend");
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged + 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced); //if the id of the square being replaced is included in the validMoves then it will be stored in validMove

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
  }

  //matching row or column of 3,4,5 candies disappear and we gain points
  //check for matches

  //check for row of four
  function checkRowForFour() {
    for (let i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundColor;
      isBlank = squares[i].style.backgroundColor === "";

      const notValid = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
      ];
      if (notValid.includes(i)) {
        continue;
      }
      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 4;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
      }
    }
  }
  checkRowForFour();

  //check for column of four
  function checkColumnForFour() {
    for (let i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 4;
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
      }
    }
  }

  checkColumnForFour();

  //check for row of three
  //i<61 because at index 63 there will be no index to check ahead
  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) {
        continue;
      }
      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 3;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
      }
    }
  }

  checkRowForThree();

  //check column for three
  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 3;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
      }
    }
  }

  checkColumnForThree();

  //invoking function constantly
  window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
  }, 100);
});
