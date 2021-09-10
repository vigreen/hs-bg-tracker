const path = require('path');

const startElectronApp = async () => {
  const electron = require('electron');
  const { BrowserWindow, app } = electron;
  let mainWindow;
  const server = require('./server/express.js');
  app.allowRendererProcessReuse = true;

  async function createWindow() {
    await server(5000);

    mainWindow = new BrowserWindow({
      width: 1400,
      height: 800,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
      },
      icon: path.join(__dirname, 'public', 'logo.png')
    });

    mainWindow.loadURL('http://localhost:5000/');

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
