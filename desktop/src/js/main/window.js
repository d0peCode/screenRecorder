const { BrowserWindow } = require('electron');

module.exports = window = {
    create(winUrl, size) {
        const config = {
            height: size.height,
            width: size.width,
            useContentSize: true,
            webPreferences: {
                nodeIntegration: true,
                nodeIntegrationInWorker: false
            }
        };
        let windowId = new BrowserWindow(config);
        //windowId.setMenu(null);
        windowId.loadURL(winUrl);
        windowId.on('closed', () => windowId = null);
        return windowId;
    }
};