import React from 'react'
import Recording from './Recording'

export default class Filters extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <React.Fragment>
                <Recording />
                <Recording />
                <Recording />
                <Recording />
                <Recording />
            </React.Fragment>
        )
    }
}