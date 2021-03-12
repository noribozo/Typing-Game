import React, {useState, useEffect, useRef} from "react"
import './index.css';

function App() {
  const startingTime = 15

  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(startingTime)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const textBoxRef = useRef(null)

  function handleChange (event) {
    const {value} = event.target
    setText(value)
  }
   function calculateWordCount(text){
     const wordsArr = text.trim().split(" ")
     return wordsArr.filter(word => word !== "").length
   }

   function startGame() {
     setIsTimeRunning(true)
     setTimeRemaining(startingTime)
     setText("")
     setWordCount(0)
     textBoxRef.current.disabled = false
     textBoxRef.current.focus()
   }

   function endGame() {
     setIsTimeRunning(false)
     setWordCount(calculateWordCount(text))
   }

   useEffect(() => {
      if(isTimeRunning && timeRemaining > 0) {
        setTimeout(() => {
          setTimeRemaining(time => time -1)
        }, 1000)
      } else if(timeRemaining === 0) {
        endGame()
      }
   }, [timeRemaining, isTimeRunning])



  return (
    <div className="App">
      <h1>SPEED TYPING GAME</h1>
      <h1>How fast can you type?</h1>
      <textarea 
          ref={textBoxRef}
          onChange={handleChange}
          value={text}
          disabled={!isTimeRunning}
          />
      <h1>Time remaining: {timeRemaining}</h1>
      <button
          onClick={startGame}
          disabled={isTimeRunning}>Start</button>
      <h1>Word count: {wordCount}</h1>
     
    </div>
  );
}

export default App;
