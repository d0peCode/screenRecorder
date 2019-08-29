const url = require('url');
const path = require('path');
const window = require('./window');
const {dialog, app, ipcMain } = require('electron');

let mainWindow, transparentWindow;

app.on('ready', () => {
    mainWindow = window.create(path.join(__dirname, '../..', 'html/index.html'), {width: 500, height: 400})
});

ipcMain.on('pick::path', async() => {
    const path = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    mainWindow.webContents.send('path::chosen', path.filePaths[0]);
});

ipcMain.on('start::video', () => {
    mainWindow.minimize();
    transparentWindow = window.create(path.join(__dirname, '../..', 'html/index.html#!/recording'))
});