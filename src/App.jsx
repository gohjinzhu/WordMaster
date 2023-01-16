import { useEffect, useRef, useState } from 'react'
import './App.css'
import "@fontsource/righteous"
import "@fontsource/roboto"
import Bubble from './components/Bubble'
import KeyBoardButton from './components/KeyBoardButton'
import Modal from './components/Modal'

function App() {
  const [input, setInput] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [inputAttempts, setInputAttempts] = useState([])
  const [winner, setWinner] = useState(false)
  const [isOpen, setIsOpen] = useState(false)


  //changing the random string will change the number of text bubbles
  const randomString = "dog"
  const stringLength = randomString.length
  const root = document.documentElement.style;
  root.setProperty('--stringLength', stringLength);

  //changing number of attempt will change the number of rows
  const numberOfAttempts = 6

  //array to render empty bubbles
  const array = new Array(stringLength * (numberOfAttempts - attempts) - (input.length < stringLength ? input.length : stringLength)).fill("")

  const detectKeyDown = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      setInput(prev => [...prev, e.key.toUpperCase()])
    } else if (e.keyCode === 8) {
      setInput(prev => prev.slice(0, -1))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)

    return () => {
      document.removeEventListener('keydown', detectKeyDown)
    }
  }, [])

  useEffect(() => {
    if (input.length > stringLength) {
      setInput(prev => prev.slice(0, -1))
    }
  }, [input])

  const check = (i) => {
    const string = randomString.toLowerCase()
    if (string.includes(input[i].toLowerCase())) {
      if (string[i] === input[i].toLowerCase()) return 'green'
      else return 'orange'
    } else return 'grey'
  }
  const userAttempt = (e) => {
    const array = []
    if (input.length === stringLength) {
      let correctWords = 0
      for (let i = 0; i < stringLength; i++) {
        const attemptClass = check(i)
        if (attemptClass === 'green') correctWords++
        array.push(<Bubble key={`${attempts}attempt${i}`} classNames={`grid-item ${attemptClass}`}>{input[i]}</Bubble>)
      }
      if (correctWords === stringLength) {
        setWinner(true)
        setIsOpen(true)
        setAttempts(0)
        setInputAttempts([])
        return
      }
      setInputAttempts(prev => [...prev, array])
      setAttempts(prev => prev + 1)
      setInput([])
     
    }
  }

  useEffect(() => {
    if (attempts === numberOfAttempts) {
      setIsOpen(true)
    }
  },[attempts])

  const buttonRef = useRef()
  const detectEnter = (e) => {
    if (e.keyCode === 13) buttonRef.current.click()
  }
  useEffect(() => {
    document.addEventListener("keydown", detectEnter)

    return () => {
      document.removeEventListener("keydown", detectEnter)
    }
  }, [])

  const keyBoardButtonArray = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L"], ["Z", "X", "C", "V", "B", "N", "M"]]

  const characterInputHandler = (e) => {
    const character = e.target.innerHTML
    setInput(prev => [...prev, character])
  }
  const enterHandler = (e) => {
    buttonRef.current.click()
  }
  const backspaceHandler = (e) => {
    console.log("backspace is pressed")
    setInput(prev => prev.slice(0, -1))
  }

  const playAgain = () => {
    setAttempts(0)
    setInputAttempts([])
    setInput([])
    setWinner(false)
    setIsOpen(false)
  }


  return (
    <div>
      {
        isOpen && <Modal setIsOpen={setIsOpen} winner={winner} word={randomString} playAgain={playAgain} />
      }
      <div className='heading'>WORD MASTER</div>
      <div className='body'>
        <div className='bubbleWrapper'>
          {/* display past attempts */}
          {inputAttempts.length > 0 ? (
            inputAttempts.map(ele => ele)
          ) : null}

          {/* display current input */}
          {input.length > 0 && input.length <= stringLength ? (
            input.map((char, index) => <Bubble key={index} classNames={`grid-item`}>{char}</Bubble>)
          ) : input.slice(0, stringLength).map((char, index) => <Bubble key={index} classNames={`grid-item`}>{char}</Bubble>)}

          {/* display empty bubbles */}
          {array.length > 0 ? array.map((ele, index) => <Bubble key={index} classNames={`grid-item`}></Bubble>) : null}
        </div>
        <button ref={buttonRef} onClick={userAttempt} className='display-none'>Submit</button>
      </div>
      <div>
        <div className='keyBoardRowContainer'>
          <div className='keyBoardContainer'>
            {keyBoardButtonArray[0].map(char => <KeyBoardButton key={char} character={char} characterInputHandler={characterInputHandler} />)}
          </div>
          <div className='keyBoardContainer'>
            {keyBoardButtonArray[1].map(char => <KeyBoardButton key={char} character={char} characterInputHandler={characterInputHandler} />)}
          </div>
          <div className='keyBoardContainer'>
            <button className='keyBoardButton' id='enter' onClick={enterHandler}>ENTER</button>
            {keyBoardButtonArray[2].map(char => <KeyBoardButton key={char} character={char} characterInputHandler={characterInputHandler} />)}
            <button className='keyBoardButton' onClick={backspaceHandler} >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


