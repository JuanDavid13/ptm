const mongo_cli = require('mongodb').MongoClient;

const URL = 'mongodb://localhost:27017';
const DBNAME= 'smog';
const client = new mongo_cli(URL);

/*
async function run() {
  try {
    await client.connect();
    const database = client.db(db_name);

    const areas = database.collection('areas');

    //const query = { name: 'prueba' };
    //const area = await areas.findOne(query);
    
    const result = await areas.find().toArray();

    for(let i = 0;  i < result.length; i++){
      //let area = JSON.parse(result[i]);
      //console.log(area.name);
      console.log(result[i])
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
*/

const database = {
  get_db: async () => {
    try {
      await client.connect();
      return client.db(DBNAME);
    } finally {
      //await client.close();
    }
    return null;
  }
}

export { database };
