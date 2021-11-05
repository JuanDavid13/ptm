import { formatDate } from '../general/date.js';

const itemClass = 'item_list';

const list = {
  printItem: (data) => {
    console.log(data);
    return `<div class="${itemClass}">
        <span>${getIcon(data.action)}</span>
        <span>${capitalize(data.concept)}</span>
        <span>${data.quant} €</span>
        <span>${formatDate(data.date)}</span>
      </div>`;
  }
}

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getIcon(action){
  if(action === 'income')
    return '📈';
  return '📉';
}

export { list };
