import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import "@fontsource/righteous"
import "@fontsource/roboto"

const Bubble = ({ children, classNames }) => {
  return (
    <span className={classNames}>{children}</span>
  )
}

// const KeyBoardButton 

//   return (
//     <button></button>

//   )

// }

function App() {
  const [input, setInput] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [inputAttempts, setInputAttempts] = useState([])

  //changing the random string will change the number of text bubbles
  const randomString = "dog"
  const stringLength = randomString.length
  const root = document.documentElement.style;
  root.setProperty('--stringLength', stringLength);

  //changing number of attempt will change the number of rows
  const numberOfAttempts = 6

  //detectKeyDown event listener will be updated everytime input state change, to get the input.length
  const detectKeyDown = useCallback((e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      if (input.length < stringLength) {

        setInput(prev => [...prev, e.key])
      }
    } else if (e.keyCode === 8 && input.length > 0) {
      console.log("backspace is pressed")
      setInput(prev => prev.slice(0, -1))
    }

  }, [input])

  //when the event listener changed, old event listener will be removed, and new event listener will be attached
  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown)

    return () => {
      document.removeEventListener('keydown', detectKeyDown)
      console.log("event listener unmounted")
    }
  }, [detectKeyDown])

  const check = (i) => {
    if (randomString.includes(input[i])) {
      if (randomString[i] === input[i]) return 'green'
      else return 'orange'
    } else return 'grey'
  }
  const userAttempt = (e) => {
    const array = []
    if (input.length === stringLength) {
      console.log("checking")
      for (let i = 0; i < stringLength; i++) {
        const attemptClass = check(i)
        array.push(<Bubble key={`attempt`} classNames={`grid-item ${attemptClass}`}>{input[i]}</Bubble>)
      }
      setInputAttempts(prev => [...prev, array])
      setAttempts(prev => prev + 1)
      setInput([])
    }
  }

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

  return (
    <div className="App">
      <div className='heading'>WORD MASTER</div>
      <div className='body'>
        <div className='wrapper'>
          {inputAttempts.length > 0 ? (
            inputAttempts.map(ele => ele)
          ) : null}

          {input.length > 0 ? (
            input.map(char => <Bubble classNames={`grid-item`}>{char}</Bubble>)
          ) : null}

          {Array(stringLength * (numberOfAttempts - attempts) - (input.length < stringLength ? input.length : stringLength)).fill(<Bubble classNames={`grid-item`}></Bubble>)}
        </div>
        <button ref={buttonRef} onClick={userAttempt} className='display-none'>Submit</button>
      </div>
      {/* <div>
        <div className='flex-container'>

        </div>
        <div className='flex-container'></div>
        <div className='flex-container'></div>
      </div> */}
    </div>
  )
}

export default App
