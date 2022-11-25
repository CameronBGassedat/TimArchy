import WebSocket from 'ws';
import redis,{createClient} from 'redis';
import ReconnectingWebSocket from 'reconnecting-websocket';

// Configuration REDIS: adapt to your environment
const client = redis.createClient({
    url: 'redis://redis',
    port: 6379
});
//Configuration WebSocket
const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 1000,
    maxRetries: 10,
};

const socket = new ReconnectingWebSocket('ws://cloud-ws:3000',[], options);
 
socket.addEventListener('open', () => {

    (async () => {
        await client.connect();
        client.on('ready', () => {
                console.log(` connected to localhost:${REDIS_SERVER}`);
        });
        
        const subscriber = client.duplicate();
        await subscriber.connect();
        
        let commandReceived;
        let keyReceived;
        let valueReceived;
        
        await subscriber.pSubscribe("__keyevent@0__:*", async  (message, channel) => {
            console.log(message.toString(), channel.toString());
            valueReceived = await client.get(message.toString());
            keyReceived = message.toString();
            commandReceived = channel.toString().split(':')[1]
            //fifo.push(JSON.stringify({command:commandReceived, key:keyReceived, value:valueReceived}))
            socket.send(JSON.stringify({command:commandReceived, key:keyReceived, value:valueReceived}))
            //sendFifo();
        }, true);
    })();
});

socket.addEventListener('message', (e) => {
    console.log(`[message] Data received from server: ${event.data}`);
});
    
socket.addEventListener('close', (event) => {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
     
});
    
socket.addEventListener('error', (error) => {
    console.log(`[error]`,error.message);
});


