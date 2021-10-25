import React from 'react'

import './styles.css'

const Panel = ({ 
	currentFloor, 
	elevatorFloor, 
	floors,
	changeFloor,
}) => {

	const getClassName = () => {
		let className = "Panel "
		if (currentFloor === elevatorFloor) {
			className += "active"
		}
		return className
	}

    return (
        <div className={getClassName()}>
			{floors.map((floor, key) => (
				<button
					key={key}
					onClick={() => changeFloor(floor.number)}
					className={`circle ${floor.number === elevatorFloor ? 'active' : ''}`}>
					{floor.number}
				</button>
			))}
        </div>
    )
}

export default Panel