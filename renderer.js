import { render } from './js/render.js';

const api = window.api;

api.receive();

let butons = $('.nav_btn');
$(butons).click((e)=>{
  render($(e.target).val());
  //render.send('get_tasks');
});

