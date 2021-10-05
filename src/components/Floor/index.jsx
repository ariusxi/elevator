import React, { forwardRef } from 'react'

import './styles.css'

const Floor = forwardRef(({ name }, ref) => {
    return (
        <div
			ref={ref}
			className="Floor">
            {name}
        </div>
    )
})

export default Floor