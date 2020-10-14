// imports
import React from 'react'
import Recording from './Recording'

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            audioArray: [],
            nameStyle: { backgroundColor: 'white' },
            dateStyle: { backgroundColor: 'white' },
            sizeStyle: { backgroundColor: 'white' },
            nameFilter: '',
            dateFilter: '',
            sizeFilter: '',
            query: this.props.searchQuery
        }
    }
    async updateState() {
        console.log("updating state...");
        var audioList = await fetch('http://localhost:3001/audios');
        let audioFilenames = await audioList.json();
        
        // filters by name
        if (this.state.nameFilter === 'asc') { audioFilenames.sort(function (a, b) { if (a.name > b.name) { return 1 } else { return -1 } }) }
        if (this.state.nameFilter === 'desc') { audioFilenames.sort(function (a, b) { if (a.name < b.name) { return 1 } else { return -1 } }) }
        
        // filters by date
        if (this.state.dateFilter === 'asc') { audioFilenames.sort(function (a, b) { if (a.created_at > b.created_at) { return 1 } else { return -1 } }) }
        if (this.state.dateFilter === 'desc') { audioFilenames.sort(function (a, b) { if (a.created_at < b.created_at) { return 1 } else { return -1 } }) }
        
        // filters by size
        if (this.state.sizeFilter === 'asc') { audioFilenames.sort(function (a, b) { if (a.size > b.size) { return 1 } else { return -1 } }) }
        if (this.state.sizeFilter === 'desc') { audioFilenames.sort(function (a, b) { if (a.size < b.size) { return 1 } else { return -1 } }) }
        
        // search!
        if (this.props.searchQuery) {
            var searchArray = await audioFilenames.filter(file => {return file.name.includes(this.props.searchQuery)})
            await this.setState({ audioArray: searchArray })
        } else {
            this.setState({ audioArray: audioFilenames })
        }
    }
    async componentDidMount() {
        this.updateState();
        this.stateInterval = setInterval(this.updateState.bind(this), 1 * 1000);
    }
    async toggleName() {
        await this.setState({ nameFilter: this.state.nameFilter === '' ? 'asc' : this.state.nameFilter === 'asc' ? 'desc' : '' })
        if (this.state.nameFilter) {
            if (this.state.nameFilter === 'asc') { this.setState({ nameStyle: { backgroundColor: 'lightgreen' } }) }
            else { this.setState({ nameStyle: { backgroundColor: 'red' } }) }
        } else { this.setState({ nameStyle: { backgroundColor: 'white' } }) }
        this.updateState()
    }
    async toggleDate() {
        await this.setState({ dateFilter: this.state.dateFilter === '' ? 'asc' : this.state.dateFilter === 'asc' ? 'desc' : '' })
        if (this.state.dateFilter) {
            if (this.state.dateFilter === 'asc') { this.setState({ dateStyle: { backgroundColor: 'lightgreen' } }) }
            else { this.setState({ dateStyle: { backgroundColor: 'red' } }) }
        }
        else { this.setState({ dateStyle: { backgroundColor: 'white' } }) }
        this.updateState()
    }
    async toggleSize() {
        await this.setState({ sizeFilter: this.state.sizeFilter === '' ? 'asc' : this.state.sizeFilter === 'asc' ? 'desc' : '' })
        if (this.state.sizeFilter) {
            if (this.state.sizeFilter === 'asc') {
                this.setState({ sizeStyle: { backgroundColor: 'lightgreen' } })
            } else { this.setState({ sizeStyle: { backgroundColor: 'red' } }) }
        } else { this.setState({ sizeStyle: { backgroundColor: 'white' } }) }
        this.updateState()
    }
    render() {
        console.log(this.props.searchQuery);
        return (
            <React.Fragment>

                <div className="filtersContainer">
                    <button style={this.state.nameStyle} className="filterBtn" onClick={this.toggleName.bind(this)} >name</button>
                    <button style={this.state.dateStyle} className="filterBtn" onClick={this.toggleDate.bind(this)} >date</button>
                    <button style={this.state.sizeStyle} className="filterBtn" onClick={this.toggleSize.bind(this)} >size</button>
                </div>

                <div className="recordingContainer">
                    {this.state.audioArray.map((audio, i) => {
                        if (!audio.deleted) {
                            return <Recording name={audio.name} url={audio.url} duration={audio.duration} size={audio.size} deleted={audio.deleted} />
                        }
                    })}
                </div>
            </React.Fragment>
        )
    }
}