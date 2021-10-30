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

    ipcRenderer.on('list-todos', (e,data)=>{
      let list = document.querySelector('#tasks');

      console.log(data);

      tasks.innerHTML = ''; // empty the list

      for(let i = 0; i < data.todos.length; i++){
        let task = document.createElement('DIV');
        task.classList.add('task');
        let task_innerHTML = '<label for="' + data.todos[i].id + '"><input type="checkbox" id="' + data.todos[i].id + '" name="todo" ';

        if(data.todos[i].status === 1){
          task_innerHTML += 'checked';
          task.classList.add('done');
        }

        task_innerHTML += '><p><b>' + data.todos[i].title + '</b></p><p>' + data.todos[i].desc + '</p></label>';

        task.innerHTML = task_innerHTML;

        tasks.append(task);
      }

    });
  }
});
