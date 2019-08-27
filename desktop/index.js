const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

//let mainWindows;
// Listen for app to be ready
app.on('ready', () => {
    let win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/html/index.html'),
        slashes: true
    }));
});