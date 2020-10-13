import React from 'react'
import Search from './Search'
import Filters from './Filters'
import List from './List'

export default class MainContainer extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="bodyContainer">
                <Search />
                <Filters />
                <List />
            </div>
        )
    }
}