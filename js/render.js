const api = window.api;

export async function render(view){
  if(view == 'money')
    renderMoney();
}

function renderMoney(){
  let cont = $('#content');
  $(cont).html(''); // empty the content;

  api.list_money((data)=>{
    let money = JSON.parse(data);
  });

  api.send('get_money');

  // creating component;
  let expence_form = document.createElement('DIV');
  $(expence_form).attr('id','exp_form_cont');

  // get the date for the date input placeholder
  let raw_date = new Date();
  let date = raw_date.getFullYear() + '-' + String(raw_date.getMonth()+1).padStart(2,'0') + '-' + String(raw_date.getDate()).padStart(2,'0');
  let exp_form_html = 
    '<form id="exp_form" method="POST">' +
      '<input id="concept" name="concept" type="text" placeholder="Reason" spellcheck="false" autocomeplet="off" required>'+
      '<input id="quant" name="quant" type="number" min="1.0" max="10000" placeholder="Quantity" step="0.05" autocomeplet="off" required>'+
      '<input id="date" name="date" type="date" value="' + date + '">'+
      '<div id="income">'+
        '<label class="checked">'+
          '<input type="radio" name="income" value="expence" checked>'+
        '😡</label>'+
        '<label>'+
          '<input type="radio" name="income" value="income">'+
        '🤑</label>'+
      '</div>'+
      '<button type="submit" id="exp_form_sub">Añadir</button>'+
    '</form>';
  
  $(expence_form).html(exp_form_html);

  // append component
  $(cont).append(expence_form);

  $('#income input').click((e)=>{
    $('#income label').removeClass('checked');
    $(e.currentTarget).parent().addClass('checked');
  });

  // no validation made yet
  $('#exp_form_sub').click((e)=>{
    e.preventDefault();
    let form = new FormData($('#exp_form')[0]);

    let concept = form.get('concept');
    let quant = form.get('quant');
    let date = parseDate(form.get('date'));
    let option = form.get('income');


  })

  //move from here
  function parseDate(date){
    let sp = date.split('-'); //sp = splitted_dted
    return sp[2] + '/' + sp[1] + '/' + sp[0];
  }
  


}
