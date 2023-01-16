import React from 'react'
import './Bubble.css'

const Bubble = ({classNames,children}) => {
    return (
        <span className={classNames}>{children}</span>
      )
}

export default Bubble