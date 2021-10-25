import React from 'react'

import './styles.css'

const CandyMachine = ({
	isShowing,
	onHide,
}) => {

	const getClassName = () => {
		let className = "CandyMachine"
		if (isShowing) className += " active"
		return className
	}

	return (
		<div className={getClassName()}>
			<button 
				className="back-button"
				onClick={() => onHide()}>
				<i className="fas fa-arrow-left"></i>
			</button>
			<object
				className="content"
				data="https://candy-machine-app.herokuapp.com/">
			</object>
		</div>
	)
}

export default CandyMachine