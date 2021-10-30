const render = window.api;
render.receive();

$('#button').click(()=>{
  render.send('print','envaindo ...');
});

