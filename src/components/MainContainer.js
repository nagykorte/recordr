import React from 'react'
import styles from '../styles/main.css'
import Header from './Header'
import Recorder from './Recorder'
import Body from './Body'



export default class MainContainer extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="mainContainer">
                <Header />
                <Recorder />
                <Body />
            </div>
        )
    }
}