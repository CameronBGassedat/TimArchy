import express from 'express';

const app = express();
const port = 3000;

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

app.get('/', async (req, res) => {
    let newLight = new Light("Kitchen Light", false);
    let timestamp = new Date();
    let dbData = new Data(timestamp, newLight);

    while (true) {
      res.send(dbData);
      await delay(1000);
    }
  });

  app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});