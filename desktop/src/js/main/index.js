const url = require('url');
const path = require('path');
const windowManager = require('./window/windowManager');
const { app, ipcMain } = require('electron');

let mainWindow, transparentWindow;

app.on('ready', () => {
    mainWindow = windowManager.create(path.join(__dirname, '../..', 'html/index.html'), {width: 500, height: 400})
});

ipcMain.on('pick::path', () => {

});

ipcMain.on('video:started', () => {
    mainWindow.minimize();
    transparentWindow = windowManager.create(path.join(__dirname, '../..', 'html/index.html#!/recording'))
});