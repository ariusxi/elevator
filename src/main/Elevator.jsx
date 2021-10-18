import React, { createRef, Component } from 'react'

import Building from '../components/Building'
import Floor from '../components/Floor'
import Panel from '../components/Panel'

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


    render() {
        return (
            <Building>
				{this.floors.reverse().map((floor, key) => (
					<Floor
						key={key} 
						{...floor}/>
				))}
				<Panel />
            </Building>
        )
    }

}

export default Elevator