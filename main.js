import { app, Menu, BrowserWindow, ipcMain } from 'electron';
//import { path } from 'path';
const path = require ('path');
import { database } from './js/database.js';

let mainWindow = null;

function createWindow ( dimensions ) {
  let __root_dir = __dirname + '/..';

  const mainWindow = new BrowserWindow({
    width: dimensions.width,
    height: dimensions.height,
    webPreferences: {
      preload: path.join(path.normalize(__root_dir),'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.setMenu(new Menu());

  mainWindow.webContents.openDevTools()

  return mainWindow;
}

app.whenReady().then(() => {

  const { screen } = require('electron');

  const primaryDisplay = screen.getPrimaryDisplay();
  mainWindow = createWindow(primaryDisplay.workAreaSize);

	app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })

  /*
  mainWindow.once('ready-to-show',()=>{
    mainWindow.webContents.send('list-todos', data);
  });

  ipcMain.on('get_tasks', (e,msg) =>{
    mainWindow.webContents.send('list_tasks', {});
  });
  */

  ipcMain.on('get_money', async (e,msg) => {
    const db = await database.get_db();
    let results = await db.collection('areas').find().toArray();
    console.log(results);
  });

})

app.on('window-all-closed', ()=> {
  app.quit;
});

