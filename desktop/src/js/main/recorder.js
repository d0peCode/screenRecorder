const fs = require('fs');
const { desktopCapturer } = require('electron');
let recorder, blobs = [];

module.exports = recorder = {
    startRecord () {
        desktopCapturer.getSources({types: ['window', 'screen']})
            .then(async() => {
                const stream = await navigator.webkitGetUserMedia({
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            minWidth: 1280,
                            maxWidth: 1280,
                            minHeight: 720,
                            maxHeight: 720
                        }
                    },
                    frameRate: {
                        min: 50,
                        ideal: 200,
                        max: 600
                    }
                }, this.handleStream, err => {
                    console.log('error', err);
                });
            })
            .catch(error => console.log(error))
    },
    handleStream(stream) {
        recorder = new MediaRecorder(stream);
        blobs = [];
        recorder.ondataavailable = function (event) {
            blobs.push(event.data);
        };
        recorder.start();
    },
    toArrayBuffer(blob, cb) {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const arrayBuffer = this.result;
            cb(arrayBuffer);
        };
        fileReader.readAsArrayBuffer(blob);
    },
    toBuffer(ab) {
        const buffer = new Buffer(ab.byteLength);
        const arr = new Uint8Array(ab);
        for (let i = 0; i < arr.byteLength; i++) {
            buffer[i] = arr[i];
        }
        return buffer;
    },
    stopRecording() {
        recorder.onstop = () => {
            this.toArrayBuffer(new Blob(blobs, {type: 'video/webm'}), (chunk) => {
                const buffer = this.toBuffer(chunk);
                const file = './videos/shot.webm';
                fs.writeFile(file, buffer, function (err) {
                    if (!err) {
                        console.log('Saved video: ' + file);
                    } else {
                        alert('Failed to save video ' + err);
                    }
                });
            });
        };
        recorder.stop();
    },
    init() {
        return new Promise((resolve) => {
            this.startRecord();
            setTimeout(() => {
                // stop recording after 2sec
                this.stopRecording();
                resolve();
            }, 2000);
        });
    }
}