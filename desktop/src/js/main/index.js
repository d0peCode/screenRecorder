const url = require('url');
const path = require('path');
const window = require('./window');
const {dialog, app, ipcMain} = require('electron');

let mainWindow, transparentWindow;

app.on('ready', () => {
    mainWindow = window.create(
        path.join(__dirname, '../..', 'html/index.html'), 
        {width: 500, height: 400}, 
        [], 
        [{name: 'setMenu', value: null}]
    );
});

ipcMain.on('pick::path', async() => {
    const path = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    mainWindow.webContents.send('path::chosen', path.filePaths[0]);
});

ipcMain.on('start::record', async() => {
    mainWindow.minimize();
    const url = __dirname + '../../../html/index.html#!/recording';
    transparentWindow = window.create(
        url, 
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
});

ipcMain.on('stop::record', async() => {
    transparentWindow.close();
    mainWindow.show();
    mainWindow.webContents.send('video::finished');
});