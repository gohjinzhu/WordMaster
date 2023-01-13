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

const KeyBoardButton = (key) => {
  return (
    <button></button>
  )

}

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

  //array to render empty bubbles
  const array = new Array(stringLength * (numberOfAttempts - attempts) - (input.length < stringLength ? input.length : stringLength)).fill("")

  //detectKeyDown event listener will be updated everytime input state change, to get the input.length
  // const detectKeyDown = useCallback((e) => {
  //   if (e.keyCode >= 65 && e.keyCode <= 90) {
  //     if (input.length < stringLength) setInput(prev => [...prev, e.key])

  //   } else if (e.keyCode === 8 && input.length > 0) {
  //     console.log("backspace is pressed")
  //     setInput(prev => prev.slice(0, -1))
  //   }

  // }, [input])

  //when the event listener changed, old event listener will be removed, and new event listener will be attached
  // useEffect(() => {
  //   document.addEventListener('keydown', detectKeyDown)

  //   return () => {
  //     document.removeEventListener('keydown', detectKeyDown)
  //   }
  // }, [detectKeyDown])

  const detectKeyDown = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      setInput(prev => [...prev, e.key])
    } else if (e.keyCode === 8) {
      console.log("backspace is pressed")
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
      console.log("checking")
      for (let i = 0; i < stringLength; i++) {
        const attemptClass = check(i)
        array.push(<Bubble key={`${attempts}attempt${i}`} classNames={`grid-item ${attemptClass}`}>{input[i]}</Bubble>)
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
          {/* display past attempts */}
          {inputAttempts.length > 0 ? (
            inputAttempts.map(ele => ele)
          ) : null}

          {/* display current input */}
          {input.length > 0 && input.length <= stringLength ? (
            input.map((char, index) => <Bubble key={index} classNames={`grid-item`}>{char}</Bubble>)
          ) : input.slice(0,stringLength).map((char, index) => <Bubble key={index} classNames={`grid-item`}>{char}</Bubble>)}

          {/* display empty bubbles */}
          {/* {Array(stringLength * (numberOfAttempts - attempts) - (input.length < stringLength ? input.length : stringLength)).fill(<Bubble classNames={`grid-item`}></Bubble>)} */}
          {array.length > 0 ? array.map((ele, index) => <Bubble key={index} classNames={`grid-item`}></Bubble>) : null}
        </div>
        <button ref={buttonRef} onClick={userAttempt} className='display-none'>Submit</button>
      </div>
      <div>
        <div className='flex-container'>

        </div>
        <div className='flex-container'></div>
        <div className='flex-container'></div>
      </div>
    </div>
  )
}

export default App
