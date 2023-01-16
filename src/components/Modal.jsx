import React from 'react'
import './Modal.css'

const Modal = ({setIsOpen, winner, word,playAgain}) => {
  return (
    <div className='modal_overlay'>
      <div className='modal'>
        <button className='close-button' onClick={e=>setIsOpen(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      {winner ? (
        <div>You Win</div>
      ) : (
          <div>
            <div>You Lose</div>
            <div>The word is {word.toUpperCase()}</div>
          </div>
        )}
        <button className='play-again' onClick={playAgain}>Play Again</button>
        </div>
    </div>
  )
}

export default Modal
