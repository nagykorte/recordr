// imports
import React from 'react'
import Header from './Header'
import Recorder from './Recorder'
import Body from './Body'
import styles from '../styles/main.css'
import { MongoClient } from "mongodb"



export default class MainContainer extends React.Component {
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