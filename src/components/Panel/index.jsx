import React from 'react'

import './styles.css'

const Panel = ({ children }) => {
    return (
        <div className="Panel">
            <button className='circle'>3</button>
            <button className='circle'>2</button>
            <button className='circle'>1</button>
            <button className='circle ground'>T</button>

        </div>
    )
}

export default Panel