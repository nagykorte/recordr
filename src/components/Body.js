// imports
import React from 'react'
import List from './List'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default class Body extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="bodyContainer">
                <form className="searchForm">
                    <input className="searchInput" type="text">
                    </input>
                    <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                </form>
                <List />
            </div>
        )
    }
}