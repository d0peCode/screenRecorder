const url = require('url');
const path = require('path');
const window = require('./window');
const {dialog, app, ipcMain} = require('electron');

let mainWindow, transparentWindow, recordingWindow;

app.on('ready', () => {
    mainWindow = window.create(
        path.join(__dirname, '../..', 'html/index.html'), 
        {width: 500, height: 300}, 
        [], 
        [{name: 'setMenu', value: null}]
    );
});

ipcMain.on('pick::path', async() => {
    const path = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    mainWindow.webContents.send('path::chosen', path.filePaths[0]);
});

ipcMain.on('start::record', () => {
    mainWindow.minimize();
    const urlTransparent = __dirname + '../../../html/index.html#!/transparent';
    const urlRecording = __dirname + '../../../html/index.html#!/recording';
    transparentWindow = window.create(
        urlTransparent, 
        {width: 1000, height: 500},
        [
            {name: 'transparent', value: true},
            {name: 'frame', value: false},
            {name: 'alwaysOnTop', value: true},
        ],
        [
            {name: 'setMenu', value: null},
            {name: 'setIgnoreMouseEvents', value: true},
            {name: 'setFocusable', value: false},
            {name: 'setFullScreen', value: true}
        ]
    );
    recordingWindow = window.create(
        urlRecording,
        {width: 250, height: 90},
        [],
        [{name: 'setMenu', value: null}]
    );
});

ipcMain.on('stop::record', () => {
    transparentWindow.close();
    recordingWindow.close();
    mainWindow.show();
    mainWindow.webContents.send('video::finished');
});