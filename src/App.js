import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

/**
 * Challenge:
 *
 * Make the input box focus (DOM elements have a method called .focus())
 * immediately when the game starts
 */

export default function App() {
  const TIMER_FREQ = 5;
  const [text, setText] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [timer, countTimer] = useState(TIMER_FREQ);
  const [gameStart, setGameStart] = useState(false);
  const textRef = useRef(null);
  //Effect to decrement timer based on timer
  useEffect(() => {
    if (timer > 0 && gameStart) {
      setTimeout(() => {
        countTimer(time => time - 1);
      }, 1000);
    } else if (timer === 0) {
      endGame();
    }
  }, [gameStart, timer]);

  function handleChange(event) {
    const { value } = event.target;
    setText(prevText => (prevText.text = value));
  }

  function countWords() {
    //split the text_area value and exclude the empty space.
    let wordsArr = text.trim().split(" ");
    //return the length of splitted array by filtering the empty strings
    let count = wordsArr.filter(words => words !== "").length;
    //return count;
    setWordCount(count);
  }

  function startGame() {
    setGameStart(true);
    countTimer(TIMER_FREQ);
    setText("");
    setWordCount(0);
    textRef.current.disabled = false;
    textRef.current.focus();
  }

  function endGame() {
    setGameStart(false);
    countWords();
  }
  return (
    <div className="App">
      <h1>Speed Typing Game</h1>
      <textarea
        disabled={!gameStart}
        value={text}
        name="text"
        onChange={handleChange}
        ref={textRef}
      />
      <h4>Time remaining {timer}</h4>
      <button disabled={gameStart} onClick={startGame}>
        {" "}
        Start Game
      </button>
      <h1>Word Count {wordCount}</h1>
    </div>
  );
}
