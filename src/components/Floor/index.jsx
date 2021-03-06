import React, { forwardRef } from 'react'

import Elevator from './../Elevator'

import './styles.css'

const Floor = forwardRef(({
	name,
	number,
	children,
	currentFloor,
	elevatorFloor,
	callElevator,
}, ref) => {
	return (
		<div
			ref={ref}
			className="Floor">
			<div className="wall">
				<div className="current-floor">{name}</div>
				<div className="shadow-corner-top"></div>
				<div className="shadow-corner-bottom"></div>
				<Elevator
					name={name}
					number={number}
					currentFloor={currentFloor}
					elevatorFloor={elevatorFloor}
					callElevator={callElevator} />
			</div>
			<div className="ground"></div>
			{children}
		</div>
	)
})

export default Floor