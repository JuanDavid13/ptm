const {app, Menu, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

let mainWindow = null;

function createWindow ( dimensions ) {

  const mainWindow = new BrowserWindow({
    width: dimensions.width,
    height: dimensions.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const m = new Menu();

  mainWindow.loadFile('index.html')
  mainWindow.setMenu(m);

  mainWindow.webContents.openDevTools()

  return mainWindow;
}

app.whenReady().then(() => {


  const { screen } = require('electron');

  const primaryDisplay = screen.getPrimaryDisplay();
  const mainWindow = createWindow(primaryDisplay.workAreaSize);

	app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })


  ipcMain.on('print', (e,msg)=>{
    console.log(msg);
    //console.log(mainWindow);
    mainWindow.webContents.send('received','ha llegado!');
  });

})

app.on('window-all-closed', ()=> {
  app.quit;
});


