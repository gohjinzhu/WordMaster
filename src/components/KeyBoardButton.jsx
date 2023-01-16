import React from 'react'
import './KeyBoardButton.css'

const KeyBoardButton = ({ character, characterInputHandler }) => {
  const clickHandler = (e) => {
    e.preventDefault()
    console.log('Button Clicked')
  }
  return (
    <button className='keyBoardButton' onClick={characterInputHandler}>
        {character}
    </button>
  )
}

export default KeyBoardButton