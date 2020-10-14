// imports
import React, { createRef } from 'react'
import List from './List'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default class Body extends React.Component {
    constructor() {
        super()
        this.searchInput = createRef()
        this.state = { searchQuery: null }
    }
    search() {
        this.setState({ searchQuery: this.searchInput.current.value })
    }
    render() {
        return (
            <div className="bodyContainer">
                <form className="searchForm">
                    <input ref={this.searchInput} className="searchInput" onChange={this.search.bind(this)} type="text">
                    </input>
                    <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                </form>
                <List searchQuery={this.state.searchQuery} />
            </div>
        )
    }
}