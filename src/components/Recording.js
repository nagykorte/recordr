// imports
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default class Recording extends React.Component {
    constructor(props) {
        super()
    }
    async delete() {
        let fetchURL = `http://localhost:3001/audios/${this.props.name}/delete`
        await fetch(fetchURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
    }
    async rename() {
        let newName = await prompt("Escriba el nuevo nombre para el archivo");
        let fetchURL = `http://localhost:3001/audios/${this.props.name}/rename/${newName}`
        await fetch(fetchURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
    }
    render() {
        return (
            <div className="recording">
                <p>{this.props.name} | {this.props.duration}ms | {this.props.size}bytes </p>
                <FontAwesomeIcon className="editRecording" onClick={this.rename.bind(this)} icon={faEdit} />
                <FontAwesomeIcon className="deleteRecording" onClick={this.delete.bind(this)} icon={faTrashAlt} />
                <audio className="audio" src={this.props.url} controls>
                </audio>
            </div>
        )
    }
}