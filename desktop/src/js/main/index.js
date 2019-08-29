const url = require('url');
const path = require('path');
const window = require('./window');
const {desktopCapturer, dialog, app, ipcMain } = require('electron');

const recorder = require('./recorder');

let mainWindow, transparentWindow;

app.on('ready', () => {
    mainWindow = window.create(path.join(__dirname, '../..', 'html/index.html'), {width: 500, height: 400})
});

ipcMain.on('pick::path', async() => {
    const path = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    mainWindow.webContents.send('path::chosen', path.filePaths[0]);
});

ipcMain.on('start::record', async() => {
    console.log('zzz',desktopCapturer)
    mainWindow.minimize();
    transparentWindow = window.create(path.join(__dirname, '../..', 'html/index.html#!/recording'), {width: 500, height: 400})
});