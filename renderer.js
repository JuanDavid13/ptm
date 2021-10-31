const render = window.api;
render.receive();

$('#button').click(()=>{
  render.send('print','envaindo ...');
});

let butons = $('.nav_btn');
$(butons).click((e)=>{
  // move to another file
  renderCtn($(e.target).val());
});

//move to another file
function renderHome(){
  $('#content').html('');
}

function renderTasks(){
  render.send('get_tasks');
}

function renderCtn(ctn){
  if(ctn == 'home')
    renderHome();

  if(ctn == 'tasks')
    renderTasks();

}

