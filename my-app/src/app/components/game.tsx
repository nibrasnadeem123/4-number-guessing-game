"use client";

import React, { useEffect, useState } from 'react'

const NumGame = () => {
  const [numGuess, setNumGuess] = useState(generateRandomNumber(50));
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState("Easy");
  const [score, setScore] = useState<any>(null);
  const [hint, setHint] = useState("");

  // Function to generate a random number based on selected difficulty
  function generateRandomNumber(range: number) {
    return Math.floor(Math.random() * range) + 1;
  }

  const handleDifficulty = (event: any) => {
    const selectDifficulty = event.target.value;
    setDifficulty(selectDifficulty)

    // Set the number range for difficulty level
    let range;
    switch (selectDifficulty) {
      case "Easy":
        range = 50;
        break;
      case "Medium":
        range = 100;
        break;
      case "Hard":
        range = 200;
        break;
      default:
        range = 50;
    }
    resetGame(range)
  }
  useEffect(() => {
    const storedScore = localStorage.getItem('score');
    if (storedScore) {
      setScore(parseInt(storedScore));
    }
  }, [])

  const provideHint = () => {
    if (numGuess % 2 === 0) {
      return "Hint: The number is even."
    } else if (numGuess % 5 === 0) {
      return "Hint: The number is a multiple of 5."
    } else {
      return "Hint: The number is odd."
    }
  };



  const handleGuess = (event: any) => {
    event.preventDefault();
    const guess = parseInt(userGuess);
    setAttempts((prevAttempt) => prevAttempt + 1);

    if (guess > numGuess) {
      setMessage("Too high! Try again.")
    } else if (guess < numGuess) {
      setMessage("Too low! Try again.")
    } else {
      const currentAttempt:any = attempts + 1;
      setMessage("Congratulations! You guess the correct number.")

      if (score === null || currentAttempt < score) {
        setScore(currentAttempt);
        localStorage.setItem('score', currentAttempt)
      }
    }

    setUserGuess("");
  }

  const handleShowHint = () => {
    setHint(provideHint())
  }

  const resetGame = (range = 50) => {
    const newNumGuess = generateRandomNumber(range)
    setNumGuess(newNumGuess)
    setAttempts(0)
    setMessage("")
    setHint("")
    setUserGuess("")
  };

  return (
    <div
      className='bg-slate-400 ml-40 mr-40 mt-20 mb-10 text-3xl p-2 rounded-2xl'
    >
      <h1
        className='text-5xl text-center bg-blue-950 text-white font-semibold ml-56 mr-56 mt-5 p-2 rounded-3xl shadow-lg shadow-slate-900'
      >
        Number guessing game
      </h1>

      <div
        className='flex justify-normal mt-5'
      >
        <h3
          className='text-3xl pt-8 text-blue-950 font-normal ml-10'
        >
          Choose difficulty:


          <select
            id="difficulty"
            value={difficulty}
            onChange={handleDifficulty}
            className='bg-slate-200 text-blue-950 rounded-lg p-1 w-80 text-center ml-10'
          >
            <option
              value="Easy"
              className='bg-slate-200 text-3xl'
            >
              Easy (1-50)
            </option>
            <option
              value="Medium"
            >
              Medium (1-100)
            </option>
            <option
              value="Hard"
            >
              Hard (1-200)
            </option>
          </select>
        </h3>

        {score !== null && <p
          className='mt-10 ml-10 text-blue-950'
        >
          Best score: {score} attempts
        </p>}


      </div>

      <div
        className="bg-slate-300 m-10 rounded-3xl items-center text-4xl shadow-lg shadow-slate-900"
      >
        <h4
          className="text-blue-950 p-5 "
        >
          Select a number between 1 and {difficulty === "Easy" ? 50 : difficulty === "Medium" ? 100 : 200}:</h4>
        <form
          onSubmit={handleGuess}
        >
          <input
            type="number"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            required
            min="1"
            max={difficulty === "Easy" ? 50 : difficulty === "Medium" ? 100 : 200}
            className="w-40 ml-80 bg-slate-200 rounded-md text-center"
          />
          <button
            type="submit"
            className="text-white bg-blue-950 p-1 rounded-xl shadow-md shadow-blue-950"
          >
            Guess
          </button>
        </form>
        <p
          className="text-3xl ml-80 mt-5 m-5"
        >
          {message}
        </p>

        {hint && <p
        className='m-8 ml-80'
        >
          {hint}
          </p>}
       

        <p
          className='text-white bg-blue-950 ml-72 mr-96 mb-2 p-1 text-center rounded-3xl'
        >
          Attempts: {attempts}
        </p>
        <br/>

      </div>

      <div>
        <button
          onClick={() => resetGame(difficulty === "Easy" ? 50 : difficulty === "Medium" ? 100 : 200)}
          className='ml-10 bg-blue-950 text-white pl-5 pr-5 p-2 rounded-2xl shadow-lg shadow-blue-950 m-5'
        >
          Play again
        </button>

        <button
          onClick={handleShowHint}
          className="bg-blue-950 text-white p-1.5 ml-10 rounded-xl shadow-lg shadow-blue-950 pl-5 pr-5 "
        >
          Hint
        </button>
      </div>
    </div>
  )
}

export default NumGame
