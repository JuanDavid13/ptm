const div_id = 'exp_form_cont';
const form_id = 'exp_form';
const form = {
  printForm: () => {
    return `<div id="${div_id}">
    <form id="${form_id}" method="POST"> 
      <input id="concept" name="concept" type="text" placeholder="Reason" spellcheck="false" autocomeplet="off" required>
      <input id="quant" name="quant" type="number" min="1.0" max="10000" placeholder="Quantity" step="0.05" autocomeplet="off" required>
      <input id="date" name="date" type="date" value="${getDate()}">
      <div id="income">
        <label class="checked">
          <input type="radio" name="income" value="expence" checked>
        😡</label>
        <label>
          <input type="radio" name="income" value="income">
        🤑</label>
      </div>
      <button type="submit" id="exp_form_sub">Añadir</button>
    </form>
  </div>`;
  }
}

// move to a general file
function getDate(){
  let raw_date = new Date();
  return raw_date.getFullYear() + '-' + String(raw_date.getMonth()+1).padStart(2,'0') + '-' + String(raw_date.getDate()).padStart(2,'0');

}

export { form };
