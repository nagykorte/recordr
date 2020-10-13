import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'


export default class MainContainer extends React.Component {
    constructor() {
        super()
        this.state = { iconColor: 'black' }
    }
    record() {
        let newColor = this.state.iconColor == 'black' ? 'red' : 'black';
        this.setState({ iconColor: newColor })
    }
    render() {
        return (
                <FontAwesomeIcon // the recorder button itself
                    style={{ color: this.state.iconColor }}
                    onClick={this.record.bind(this)} //toggler
                    className="recordIcon"
                    icon={faPlayCircle}
                />
        )
    }
}