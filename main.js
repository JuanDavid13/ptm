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

  ipcMain.on('get_tasks', (e,msg) =>{
    mainWindow.webContents.send('list_tasks', data.todos );
  });

  const mongo_cli = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017';
  const db_name = 'smog';

  const client = new mongo_cli(url);

  async function run() {
    try {
      await client.connect();
      const database = client.db(db_name);
      const areas = database.collection('areas');

      //const query = { name: 'prueba' };
      //const area = await areas.findOne(query);
      
      const result = await areas.find().toArray();

      for(let i = 0;  i < result.length; i++){
        //let area = JSON.parse(result[i]);
        //console.log(area.name);
        console.log(result[i])
      }

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);


})

app.on('window-all-closed', ()=> {
  app.quit;
});


