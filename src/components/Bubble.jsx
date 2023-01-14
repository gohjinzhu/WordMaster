import React from 'react'

const Bubble = ({classNames,children}) => {
    return (
        <span className={classNames}>{children}</span>
      )
}

export default Bubble