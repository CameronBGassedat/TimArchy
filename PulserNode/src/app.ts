import { createClient } from 'redis';
import dataJson from './allsensor.json';

const url = process.env.REDIS_URL || 'redis://redis:6379';


main();
async function main(){
  const client = createClient({
    url
  });

  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();

  var mykey : number = 0;
  let jsonArray : Array<string>;
  for (var singledata in dataJson)
  {
    delay(1000);
    await client.set(mykey.toString(), JSON.stringify(singledata));
    mykey++;
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

// class Light {
//   name : string;
//   status : boolean;
  
//   constructor(name: string, status : boolean) {
//       this.name = name;
//       this.status = status;
//   }
// }

// class Data {
//   timestamp : Date;
//   object : Light;

//   constructor(timestamp: Date, object : Light) {
//     this.timestamp = timestamp;
//     this.object = object;
//   }
// }
