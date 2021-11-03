"use strict";

const {
  app,
  Menu,
  BrowserWindow,
  ipcMain
} = require('electron');

const path = require('path');

const database = require('./js/database.js'); //import { getDB }= require('./js/database.js');


let mainWindow = null;

function createWindow(dimensions) {
  const mainWindow = new BrowserWindow({
    width: dimensions.width,
    height: dimensions.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('index.html');
  mainWindow.setMenu(new Menu());
  mainWindow.webContents.openDevTools();
  return mainWindow;
}

app.whenReady().then(() => {
  const {
    screen
  } = require('electron');

  const primaryDisplay = screen.getPrimaryDisplay();
  mainWindow = createWindow(primaryDisplay.workAreaSize);
  mainWindow.once('ready-to-show', () => {//mainWindow.webContents.send('list-todos', data);
  }); //app.on('activate', () => {
  //  if (BrowserWindow.getAllWindows().length === 0)
  //    createWindow()
  //})
  // move this to a separete file

  ipcMain.on('print', (e, msg) => {
    console.log(msg); //console.log(mainWindow);

    mainWindow.webContents.send('received', 'ha llegado!');
  });
  ipcMain.on('get_tasks', (e, msg) => {
    mainWindow.webContents.send('list_tasks', data.todos);
  });
  ipcMain.on('get_money', async (e, msg) => {
    const db = await database();
    let results = await db.collection('areas').find().toArray();
    console.log(results);
  });
});
app.on('window-all-closed', () => {
  app.quit;
});
