const path = require('path');

const startElectronApp = async () => {
  const electron = require('electron');
  const { BrowserWindow, app } = electron;
  let mainWindow;
  const reactServer = require('./server/index.js');


  //const msg = await reactServer();
  //console.log(msg)

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
      }
    });

    mainWindow.loadURL('http://localhost:3000/');
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();


    mainWindow.on('closed', function () {
      mainWindow = null;
    });
  }

  app.on('ready', createWindow);

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

startElectronApp();
