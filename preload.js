const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api',{
  send:(chnl, msg) => {
    ipcRenderer.send(chnl, msg);
  },
  receive: () => {

    //move this to another file
    ipcRenderer.on('received', (e,msg) => {
      console.log(msg);
    });

    ipcRenderer.on('list_tasks', (e,tasks)=>{
      let content = document.querySelector('#content');

      for(let i = 0; i < tasks.length; i++){
        let task = document.createElement('DIV');
        task.classList.add('task');
        let task_innerHTML = '<label for="' + tasks[i].id + '"><input type="checkbox" id="' + tasks[i].id + '" name="todo" ';

        if(tasks[i].status === 1){
          task_innerHTML += 'checked';
          task.classList.add('done');
        }

        task_innerHTML += '><p><b>' + tasks[i].title + '</b></p><p>' + tasks[i].desc + '</p></label>';

        task.innerHTML = task_innerHTML;

        content.append(task);
      }

    });
  }
});
