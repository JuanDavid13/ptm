const {app, Menu, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

let mainWindow = null;

let data = {
  todos: [
    {
      id: 01,
      status: 1,
      title: 'first task',
      desc: 'this is the first task' 
    },
    {
      id: 02,
      status: 0,
      title: 'second task',
      desc: 'this is the second task' 
    }
  ]
}

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

  mainWindow.once('ready-to-show',()=>{
    mainWindow.webContents.send('list-todos', data);
  });

	//app.on('activate', () => {
  //  if (BrowserWindow.getAllWindows().length === 0)
  //    createWindow()
  //})


  // move this to a separete file
  ipcMain.on('print', (e,msg)=>{
    console.log(msg);
    //console.log(mainWindow);
    mainWindow.webContents.send('received','ha llegado!');
  });


})

app.on('window-all-closed', ()=> {
  app.quit;
});


