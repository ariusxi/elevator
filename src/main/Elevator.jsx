import React, { createRef, Component } from 'react'

import Building from '../components/Building'
import Floor from '../components/Floor'
import Panel from '../components/Panel'

class Elevator extends Component {

	floors = [{
		name: "Terceiro Andar",
		number: '3',
		ref: createRef(),
	}, {
		name: "Segundo Andar",
		number: '2',
		ref: createRef(),
	}, {
		name: "Primeiro Andar",
		number: '1',
		ref: createRef(),
	}, {
		name: "Térreo",
		number: 'T',
		ref: createRef(),
	}]

	state = {
		currentFloor: 'T',
		elevatorFloor: '3',
	}

	constructor(props) {
		super(props)

		this.changeFloor = this.changeFloor.bind(this)
		this.callElevator = this.callElevator.bind(this)
	}

	componentDidMount() {
		const groundFloorRef = this.floors[this.floors.length - 1].ref

		groundFloorRef.current.scrollIntoView()
	}

	scrollFloor(floor) {
		const { ref: groundFloorRef } = floor

		groundFloorRef.current.scrollIntoView({
			behavior: "smooth",
		})
	}

	changeFloor(selectedFloor) {
		const floor = this.floors.find((floor) => floor.number === selectedFloor)

		const currentFloorIndex = this.floors.findIndex((floor) => floor.number === this.state.currentFloor)
		const floorIndex = this.floors.findIndex((floor) => floor.number === selectedFloor)

		this.setState({
			currentFloor: selectedFloor,
		})

		const self = this
		setTimeout(() => {
			let currentIndex = currentFloorIndex

			self.scrollFloor(floor)
			const interval = setInterval(() => {
				if (currentFloorIndex < floorIndex) {
					currentIndex++
				} else {
					currentIndex--
				}

				self.setState({
					elevatorFloor: this.floors[currentIndex].number,
				})

				if (currentIndex === floorIndex) {
					clearInterval(interval)
				}
			}, 1000)
		}, 2000)
	}

	callElevator() {
		const currentFloorIndex = this.floors.findIndex((floor) => floor.number === this.state.elevatorFloor)
		const floorIndex = this.floors.findIndex((floor) => floor.number === this.state.currentFloor)

		let currentIndex = currentFloorIndex

		const self = this
		const interval = setInterval(() => {
			if (currentFloorIndex < floorIndex) {
				currentIndex++
			} else {
				currentIndex--
			}

			self.setState({
				elevatorFloor: this.floors[currentIndex].number,
			})

			if (currentIndex === floorIndex) {
				clearInterval(interval)
			}
		}, 1000)
	}

	render() {
		const {
			currentFloor,
			elevatorFloor,
		} = this.state

		return (
			<Building>
				{this.floors.map((floor, key) => {
					const props = {
						...floor,
						currentFloor,
						elevatorFloor,
						callElevator: this.callElevator,
					}

					return (
						<Floor
							key={key}
							{...props}>
							{floor.decoration}
						</Floor>
					)
				})}
				<Panel
					currentFloor={currentFloor}
					elevatorFloor={elevatorFloor}
					floors={this.floors}
					changeFloor={this.changeFloor} />
			</Building>
		)
	}

}

export default Elevator