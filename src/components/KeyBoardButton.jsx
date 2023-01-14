import React from 'react'

const KeyBoardButton = ({ character, characterInputHandler }) => {
  const clickHandler = (e) => {
    e.preventDefault()
    console.log('Button Clicked')
  }
  return (
    <button className='keyBoardButton' onClick={characterInputHandler}>
      {/* <div className='keyBoardButtonDiv'> */}
        {character}
      {/* </div> */}
    </button>
  )
}

export default KeyBoardButton