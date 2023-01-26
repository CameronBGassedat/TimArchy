import express from 'express';
import redis,{createClient} from 'redis';

// const REDIS_USER = "http://localhost:6379";

const app = express();

// Configuration REDIS: adapt to your environment
const client = redis.createClient({
        url: 'redis://localhost:6379'
        // host: '127.0.0.1',
        // port: 6379
});

await client.connect();
client.on('ready', () => {
    console.log(` connected to localhost: shuuuut`);
});

app.post("/dosomeshit", (req, res) => {
    console.log("work or else ...");
});

// app.post();

// // TODO: change name ofapp.js
// // TODO: add split fuction for redis part
// app.get('/', (req, res) =>{
//     // get user from redis
//     const user = client.get('userId', 'userValue')
//     res.status(200);
// });