const express = require("express");
const app = express();
const fs = require('fs')
const { promisify } = require('util');
const cors = require("cors");
const bodyParser = require('body-parser')
const AudioFile = require('./model')
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

const writeFile = promisify(fs.writeFile);
const mongoose = require('mongoose');

const audioFolder = '../public/audios/';
if (!fs.existsSync(audioFolder)) {
    fs.mkdirSync(audioFolder);
} // check for 


mongoose.connect("mongodb://127.0.0.1:27017/recordr", {
    useNewUrlParser: true, useUnifiedTopology: true,
});

const connection = mongoose.connection;

// here be db connection&functions

app.get('/audios', async (req, res) => {
    let audios = await AudioFile.find()
    res.send(audios);
});

////////////////
//// CREATE ////
////////////////

app.post('/audios', async (req, res) => {
    if (!req.body.message) {
        return res.status(400).json({ error: 'No req.body.message' });
    }
    const today = new Date()
    const audioId = `rec_${today.getDate()}-${today.getMonth()}_${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.ogg`
    writeFile(audioFolder + audioId, req.body.message, 'base64')
        .then(() => {
            res.status(201).json({ message: 'Saved audio' });
        })
        .catch(err => {
            console.log('Error writing audio to file', err);
            res.sendStatus(500);
        });
    let newAudio = new AudioFile({name: audioId, url: `/audios/${audioId}` ,duration: req.body.duration ,size: req.body.size })
    await newAudio.save(function (err) {
        if (err) throw err;
    })
});

////////////////
//// delete ////
////////////////

app.post('/audios/:filename/delete', async function (req,res) {
    let thisAudio = await AudioFile.findOne({name: req.params.filename});
    if (!thisAudio.deleted) {
        thisAudio.deleted = true;
    }
    await thisAudio.save();
})

////////////////
//// update ////
////////////////

app.post('/audios/:filename/rename/:newName', async function (req,res) {
    let thisAudio = await AudioFile.findOne({name: req.params.filename});
    thisAudio.name = req.params.newName;
    await thisAudio.save()
})


const PORT = 3001;
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});