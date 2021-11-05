import { formatDate } from './general/date.js';
import { list } from './money/list.js';
import { form } from './money/form.js';

const api = window.api;

export function render(view){
  if(view == 'money')
    renderMoney();
}

// isolate in another file
function renderMoney(){
  let cont = $('#content');
  $(cont).html(''); // empty the content;

  api.send('get_money');

  let frm = form.printForm();
  $(cont).append(frm);

  api.list_money((data)=>{
    let info = JSON.parse(data);
    for(let i = 0; i < info.length; i++){
      $(cont).append(list.printItem(info[i]));
    }
  });


  // stablishing interactivity
  
  $('#income input').click((e)=>{
    $('#income label').removeClass('checked');
    $(e.currentTarget).parent().addClass('checked');
  });

  /* NOTE: no validation made yet */
  $('#exp_form_sub').click((e)=>{
    e.preventDefault();
    let form = new FormData($('#exp_form')[0]);

    let money_operation = {
      concept: form.get('concept'),
      quant: form.get('quant'),
      date: formatDate(form.get('date')),
      option: form.get('option'),
    }

    api.send('insert_money_operation',money_operation);

  });
}
