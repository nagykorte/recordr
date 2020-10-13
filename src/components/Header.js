import React from 'react'
import styles from '../styles/main.css'
import img from '../img/mic-bg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'


export default class MainContainer extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="headerContainer">
                <h3 className="pageLogo">RecordR</h3>
                <img src={img} className="micImg"></img>
            </div>
        )
    }
}