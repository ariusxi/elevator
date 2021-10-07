import React, { createRef, Component } from 'react'

import Building from '../components/Building'
import Floor from '../components/Floor'
import Panel from '../components/Panel'

class Elevator extends Component {

	floors = [{
		name: "Térreo",
		ref: createRef(),
	}, {
		name: "Primeiro Andar",
		ref: createRef(),
	}, {
		name: "Segundo Andar",
		ref: createRef(),
	}, {
		name: "Terceiro Andar",
		ref: createRef(),
	}]


    render() {
        return (
            <Building>
				<Panel />
            </Building>
        )
    }

}

export default Elevator