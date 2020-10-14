// imports
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophoneAlt, faSquareFull, faPlay, faSave } from '@fortawesome/free-solid-svg-icons'

export default class Recorder extends React.Component {
    constructor() {
        super()
        this.state = {
            iconColor: 'black',
            recBtn: 'inline',
            stopBtn: 'none',
            playBtn: 'none',
            saveBtn: 'none',
            currentAudio: null,
            seconds: 0,
            centiSeconds: 0,
            timerOn: false
        }
        // this.record.bind(this)
    }
    //////////////////
    //// recorder ////
    //////////////////

    // async record() {

    //     return recorder
    // }
    ////////////////////////
    /////// buttons ////////
    ////////////////////////

    async recButton() {
        // var recorder = await this.record();

        let recorder = await new Promise(async function (resolve) {
            var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            var mediaRecorder = new MediaRecorder(stream);
            var audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", async event => {
                audioChunks.push(event.data);
            });
            const start = () => { audioChunks = []; mediaRecorder.start() };
            const stop = () =>
                new Promise(resolve => {
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob)
                        const audio = new Audio(audioUrl);
                        const play = function () { audio.play() };
                        resolve({ audioBlob, audioUrl, play });
                    });
                    mediaRecorder.stop();
                });
            resolve({ start, stop });
        });



        this.startWatch()
        recorder.start()
        await this.setState({ stopBtn: 'inline', recBtn: 'none' })
        this.setState({ currentAudio: recorder })
    };
    async stopButton() {
        let audio = await this.state.currentAudio.stop();
        this.stopWatch();
        audio.play();
        await this.setState({ recBtn: 'block', stopBtn: 'none', saveBtn: 'block', playBtn: 'block', currentAudio: audio })
    };
    saveButton() {
        if (this.state.currentAudio.audioBlob.size < 500000) { // 500kb size limit
            const reader = new FileReader();
            reader.readAsDataURL(this.state.currentAudio.audioBlob);
            reader.onload = async () => {
                const base64AudioMessage = reader.result.split(',')[1];
                console.log(base64AudioMessage);
                let res = await fetch('http://localhost:3001/audios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: base64AudioMessage, size: this.state.currentAudio.audioBlob.size, duration: (this.state.seconds * 1000 + this.state.centiSeconds * 10) })
                })
                if (res.status === 201) {
                    // return populateAudioMessages();
                }
                console.log('Invalid status saving audio message: ' + res.status);
            }
        } else {
            console.log('audio too big');
            alert('The audio size is over the permitted amount, for server payment reasons.')
        }
    };
    playLastRec() {
        this.setState({ recBtn: false });
        this.state.currentAudio.play();
        this.setState({ recBtn: true });
        console.log(this.state.currentAudio.audioBlob.size);
    };
    ////////////////////
    ////// watch ///////
    ////////////////////    

    startWatch() {
        this.setState({
            timerOn: true,
            seconds: 0,
            centiSeconds: 0
        });
        this.timer = setInterval(() => {
            this.setState({
                centiSeconds: this.state.centiSeconds + 1
            })
            if (this.state.centiSeconds === 100) {
                this.setState({ centiSeconds: 0, seconds: this.state.seconds + 1 })
            }
            if (this.state.seconds > 59) {
                this.stopButton();
            }
        }, 10);
    };
    stopWatch() {
        clearInterval(this.timer)
        this.setState({ timerOn: false })
    }
    render() {
        return (
            <div className="recorderContainer">
                <div className="Chronometer"> {this.state.seconds}.{this.state.centiSeconds} </div>
                <FontAwesomeIcon // the recorder button itself
                    style={{ display: this.state.recBtn, }}
                    className="recordIcon"
                    icon={faMicrophoneAlt}
                    onClick={this.recButton.bind(this)}
                />
                <FontAwesomeIcon // the recorder button itself
                    style={{ display: this.state.stopBtn }}
                    onClick={this.stopButton.bind(this)} //toggler
                    className="stopIcon"
                    icon={faSquareFull}
                />
                <FontAwesomeIcon // the recorder button itself
                    style={{ display: this.state.playBtn }}
                    onClick={this.playLastRec.bind(this)} //toggler
                    className="playIcon"
                    icon={faPlay}
                />
                <FontAwesomeIcon // the recorder button itself
                    style={{ display: this.state.playBtn }}
                    onClick={this.saveButton.bind(this)} //toggler
                    className="saveIcon"
                    icon={faSave}
                />
            </div>
        )
    }
}