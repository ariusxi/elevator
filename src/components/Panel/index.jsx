import React from 'react'

import './styles.css'

const Panel = ({ children }) => {
    return (
        <div className="Panel">
            <button class='circle'>3</button><br />
            <button class='circle'>2</button><br />
            <button class='circle'>1</button><br />
            <button class='circle'>T</button>

        </div>
    )
}

export default Panel