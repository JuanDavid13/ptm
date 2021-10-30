const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api',{
  send:(chnl, msg) => {
    ipcRenderer.send(chnl, msg);
  },
  receive: () => {
    ipcRenderer.on('received', (e,msg) => {
      console.log(msg);
    });
  }
});
