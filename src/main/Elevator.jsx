import React, { createRef, Component } from 'react'

import Building from '../components/Building'
import Floor from '../components/Floor'

class Elevator extends Component {

	floors = [{
		name: "Térreo",
		number: 'T',
		ref: createRef(),
	}, {
		name: "Primeiro Andar",
		number: '1',
		ref: createRef(),
	}, {
		name: "Segundo Andar",
		number: '2',
		ref: createRef(),
	}, {
		name: "Terceiro Andar",
		number: '3',
		ref: createRef(),
	}]

	componentDidMount() {
		const groundFloorRef = this.floors[this.floors.length - 1].ref
		
		groundFloorRef.current.scrollIntoView()
	}

    render() {
        return (
            <Building>
				{this.floors.reverse().map((floor, key) => (
					<Floor
						key={key} 
						{...floor}/>
				))}

            </Building>
        )
    }

}

export default Elevator