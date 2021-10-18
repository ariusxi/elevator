import React from 'react'

import './styles.css'

const Elevator = ({ number, name }) => {
	return (
		<div className="Elevator">
			<div className="panel-call">
				<div className="button-up"></div>
				<div className="button-down"></div>
			</div>
			<div className="floor">{number}</div>
			<div className="elevator-door">
				<div className="door"></div>
				<div className="inside">
					<div className="btns">
						<div className="bt-l">
							<div className="bt"></div>
							<div className="bt"></div>
							<div className="bt"></div>
							<div className="bt"></div>
							<div className="bt"></div>
						</div>
						<div className="bt-r">
							<div className="bt"></div>
							<div className="bt"></div>
							<div className="bt"></div>
							<div className="bt"></div>
							<div className="bt"></div>
						</div>
					</div>
					<div className="handrails"></div>
				</div>
			</div>
			<div className="btn"></div>
		</div>
	)
}

export default Elevator