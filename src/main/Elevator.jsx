import React, { createRef, Component } from 'react'

import Building from '../components/Building'
import CandyMachine from '../components/CandyMachine'
import Floor from '../components/Floor'
import Panel from '../components/Panel'

import ElevatorButton from '../assets/sounds/elevator-button.mp3'
import ElevatorBackground from '../assets/sounds/background.mp3'
import ElevatorDoorOpen from '../assets/sounds/elevator-door-open.mp3'
import ElevatorDoorClose from '../assets/sounds/elevator-door-close.mp3'
import ElevatorDing from '../assets/sounds/elevator-ding.mp3'

import CandyMachineImg from '../assets/images/candy-machine-cropped.png'
import CatSleeping from '../assets/images/cat-sleeping-2.gif'

import Plant1 from '../assets/images/plant-1.png'
import Plant2 from '../assets/images/plant-2.png'
import Plant3 from '../assets/images/plant-3.png'

import './Elevator.css'

class Elevator extends Component {

	sounds = {
		elevatorCall: new Audio(ElevatorButton),
		elevatorSong: new Audio(ElevatorBackground),
		elevatorDoorOpen: new Audio(ElevatorDoorOpen),
		elevatorDoorClose: new Audio(ElevatorDoorClose),
		elevatorDing: new Audio(ElevatorDing),
	}

	floors = [{
		name: "3º",
		number: '3',
		ref: createRef(),
	}, {
		name: "2º",
		number: '2',
		ref: createRef(),
	}, {
		name: "1º",
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
		isElevatorSongPlaying: false,
		isElevatorArrived: false,
		isShowingCandyMachine: false,
	}

	constructor(props) {
		super(props)

		this.changeFloor = this.changeFloor.bind(this)
		this.callElevator = this.callElevator.bind(this)
		this.showHideCandyMachine = this.showHideCandyMachine.bind(this)
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

	playSound(audioInstance, volume = 1, loop = false) {
		audioInstance.volume = volume
		audioInstance.loop = loop

		audioInstance.play()
	}

	setVolume(audioInstance, volume) {
		audioInstance.volume = volume
	}

	showHideCandyMachine() {
		this.setState((prevState) => ({
			isShowingCandyMachine: !prevState.isShowingCandyMachine,
		}))
	}

	changeFloor(selectedFloor) {
		const floor = this.floors.find((floor) => floor.number === selectedFloor)

		const currentFloorIndex = this.floors.findIndex((floor) => floor.number === this.state.currentFloor)
		const floorIndex = this.floors.findIndex((floor) => floor.number === selectedFloor)

		if (floor.number === this.state.currentFloor) {
			return
		}

		this.playSound(this.sounds.elevatorDoorClose)
		this.playSound(this.sounds.elevatorCall)

		this.setState({
			currentFloor: selectedFloor,
		})

		if (!this.state.isElevatorSongPlaying) {
			this.playSound(this.sounds.elevatorSong, 0.2, true)
			this.setState({
				isElevatorSongPlaying: true,
			})
		} else {
			this.setVolume(this.sounds.elevatorSong, 0.2)
		}

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
					self.setVolume(self.sounds.elevatorSong, 0.02)
					self.playSound(self.sounds.elevatorDoorOpen)
					self.playSound(self.sounds.elevatorDing)
				}
			}, 2000)
		}, 4000)
	}

	callElevator() {
		const currentFloorIndex = this.floors.findIndex((floor) => floor.number === this.state.elevatorFloor)
		const floorIndex = this.floors.findIndex((floor) => floor.number === this.state.currentFloor)

		let currentIndex = currentFloorIndex

		if (this.state.isElevatorArrived) {
			return
		}

		this.playSound(this.sounds.elevatorCall)

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

				self.setState({
					isElevatorArrived: true,
				})

				self.playSound(self.sounds.elevatorDoorOpen)
				self.playSound(self.sounds.elevatorDing)
			}
		}, 2000)
	}

	render() {
		const {
			currentFloor,
			elevatorFloor,
			isShowingCandyMachine,
		} = this.state

		const decorators = [{
			children: (
				<>
					<img
						className="plant-floor-4"
						src={Plant3}
						alt={Plant3}/>
				</>
			)
		},{
			children: (
				<>
					<img
						className="plant-floor-3"
						src={Plant2}
						alt={Plant2}/>
				</>
			)
		},
		{
			children: (
				<>
					<img
						className="plant-floor-2"
						src={Plant1}
						alt={Plant1}/>
				</>
			)
		},{
			children: (
				<>
					<img
						className="plant-floor-1"
						src={Plant3}
						alt={Plant3}/>
					<div className="CatSleeping">
						<img
							src={CatSleeping}
							alt={CatSleeping}/>
					</div>
					<img 
						className="CandyMachineIcon"
						onClick={() => this.showHideCandyMachine()}
						src={CandyMachineImg} 
						alt={CandyMachineImg}/>
					<CandyMachine
						isShowing={isShowingCandyMachine}
						onHide={this.showHideCandyMachine}/>
				</>
			)
		}]

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
							{decorators[key].children}
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