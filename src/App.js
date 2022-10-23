import React, { useEffect, useState} from "react";
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'
import ScoreBoard from "./Components/Scoreboard";

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
]

// const Blank = [blank]

const App = () => {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  const checkForColumnFour =() => {
    for (let i = 0; i <= 39; i++) {
       const columnOfFour = [i, i + width, i + width * 2, i + width*3]
       const decidedColor = currentColorArrangement[i]
       const isBlank = currentColorArrangement[i] === blank

       if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor  && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
       } 
    }  
   }

   console.log(scoreDisplay);
  
   const checkForRowFour =() => {
    for (let i = 0; i < 64; i++) {
       const rowOfFour = [i, i + 1, i + 2, i + 3]
       const decidedColor = currentColorArrangement[i]
       const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
       const isBlank = currentColorArrangement[i] === blank

       if(notValid.includes(i)) continue
  
  
       if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor  && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
       } 
    }  
   }
  

 const checkForColumnThree =() => {
  for (let i = 0; i <= 47; i++) {
     const columnOfThree = [i, i + width, i +width * 2]
     const decidedColor = currentColorArrangement[i]
     const isBlank = currentColorArrangement[i] === blank

     if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor  && !isBlank)) {
      setScoreDisplay((score) => score + 3)
      columnOfThree.forEach(square => currentColorArrangement[square] = blank)
      return true
     }  
  }  
 }

 const checkRowOfThree =() => {
  for (let i = 0; i < 64; i++) {
     const rowOfThree = [i, i + 1, i + 2,]
     const decidedColor = currentColorArrangement[i]
     const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
     const isBlank = currentColorArrangement[i] === blank

     if(notValid.includes(i)) continue

     if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreDisplay((score) => score + 3)
     rowOfThree.forEach(square => currentColorArrangement[square] = blank)
      return true
     } 
  }  
 }


 const moveIntoSquareBelow = () => {
   for (let i = 0; i < 55; i++) {

    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
    const isFirstRow = firstRow.includes(i)

    if (isFirstRow & currentColorArrangement[i] === blank) {
      let randomNumber = Math.floor(Math.random() * candyColors.length)
      currentColorArrangement[i] = candyColors[randomNumber]
    }

    if(currentColorArrangement[i + width] === blank) {
      currentColorArrangement[i +width] = currentColorArrangement[i]
      currentColorArrangement[i] = blank
    }
   }
 }

 const dragStart = (e) => {
  console.log("starting")
  console.log(e.target)
  setSquareBeingDragged(e.target) }



 const dragDrop = (e) => {
  console.log("dropping")
  console.log(e.target)
  setSquareBeingReplaced(e.target)

 }

 const dragEnd = (e) => {

console.log("ending");

const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute("src")
currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute("src")

console.log('squareBeingDraggedId', squareBeingDraggedId)
console.log('squareBeingReplacedId', squareBeingReplacedId)


const validMoves = [
  squareBeingDraggedId - 1,
  squareBeingDraggedId + width,
  squareBeingDraggedId + 1,
  squareBeingDraggedId - width
]

const validMove = validMoves.includes(squareBeingReplacedId)
  const isAColumnOfFour =  checkForColumnFour()
 const isAcolumnOfThree = checkForColumnThree()
const isArowOfFour =  checkForRowFour()
 const isArowOfThree = checkRowOfThree()

 if(squareBeingReplacedId 
  && validMove && 
  ( isAColumnOfFour || isAcolumnOfThree || isArowOfFour || isArowOfThree)) {
    setSquareBeingDragged(null)
    setSquareBeingReplaced(null)
  } else {
    currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute("src")
    currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute("src")
   setCurrentColorArrangement([...currentColorArrangement])
  }
}

const createBoard = () => {

const randomColorArrangement = [];

 for (let i = 0; i < width*width; i++) {
   const randomColors = candyColors[Math.floor(Math.random()*candyColors.length)]
   randomColorArrangement.push(randomColors);

 }
  setCurrentColorArrangement(randomColorArrangement);
}


useEffect(() => {
  createBoard();
}, [width])


useEffect(() => {
  const timer = setInterval(() => {
    checkForColumnFour()
    checkForRowFour()
    checkForColumnThree()
    checkRowOfThree()
    moveIntoSquareBelow()
    setCurrentColorArrangement([...currentColorArrangement])
  }, 300)
  return () => clearInterval(timer)

}, [checkForColumnFour,checkForRowFour, checkForColumnThree, checkRowOfThree,moveIntoSquareBelow, currentColorArrangement])

return (
  <div className="App">
  <div className="game">
     {currentColorArrangement.map((candyColor, index) => (
      <img 
      key={index}
      alt={candyColor}
      src={candyColor}
      data-id={index}
      draggable={true}
      onDragStart={dragStart}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter = {(e) => e.preventDefault()}
      onDragLeave = {(e) => e.preventDefault()}
      onDrop={dragDrop}
      onDragEnd={dragEnd}
      />
     ))}
  </div>
  <ScoreBoard  score={scoreDisplay}/>
  </div>
)
}

export default App;
