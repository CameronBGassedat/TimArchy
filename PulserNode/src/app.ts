import express from 'express';
import { createClient } from 'redis';

const url = process.env.REDIS_URL || 'redis://localhost:6379';

main();
async function main(){
  const client = createClient({
    url
  });

  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  var mykey : number = 0;
  let lightshit = new Light("kitchen light", false);

  while (true) {
    await delay(1000);

    await client.set(mykey.toString(), "ceci est un test, shut c'est pafait");
    mykey++;
  }
}

class Light {
  name : string;
  status : boolean;
  
  constructor(name: string, status : boolean) {
      this.name = name;
      this.status = status;
  }
}

class Data {
  timestamp : Date;
  object : Light;

  constructor(timestamp: Date, object : Light) {
    this.timestamp = timestamp;
    this.object = object;
}
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}