import { database  } from './database';

/*
 * Money Model
 * _id
 * concept
 * quant
 * date
 * option
 */

const money = {
  get_money: async () => {
      const db = await database.get_db();
      let results = await db.collection('money').find().toArray();
      database.close();
      return JSON.stringify(parse_money_list(results));
  }
}

function parse_money_list(results){
  let result = [];
  for(let i = 0; i < results.length; i++){
    console.log(results[i]);
    let row = { 
      concept: results[i].concept,
      quant: results[i].quant,
      date: results[i].date,
      action: results[i].action
    };
    result.push(row);
  }
  return result;
}

export { money };
