import { database  } from './database';

const money = {
  get_money: async ()=>{
      const db = await database.get_db();
      let results = await db.collection('areas').find().toArray();
      database.close();
      return JSON.stringify(parse_money_list(results));
  }
}

function parse_money_list(results){
  let result = [];
  for(let i = 0; i < results.length; i++){
    let area = { name: results[0].name };
    result.push(area);
  }
  return result;
}

export { money };
