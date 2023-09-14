import WebSocket from 'ws';
import redis,{createClient} from 'redis';
import ReconnectingWebSocket from 'reconnecting-websocket';
import mqtt from 'mqtt';
import axios from 'axios';

var bonjour = require('bonjour')()

bonjour.publish({name:'AirluxBox',type: 'http', port:3000})
console.log("test")
const client_mqtt = mqtt.connect("mqtt://broker:1883");


client_mqtt.subscribe('esp32/output')
client_mqtt.subscribe('esp32')
var JSONmessage
var baseUrl = "http://api-local:3000"
client_mqtt.on('message', function (topic, message) {
    JSONmessage = JSON.parse(message.toString())
    console.log("Message du topic ",topic, " - Message => ",message.toString())
    console.log("Message JSON", JSONmessage)
    console.log(" \n\n sensorType =>", JSONmessage.sensorType)

    var finalUrl = baseUrl + '/sensor/' + JSONmessage.id
    axios.patch(finalUrl,{
        id: JSONmessage.id,
        value: JSONmessage.humidity,
        capacity: JSONmessage.sensorType
    })
    
    //patchSensor(JSONmessage.id, JSONmessage.id, JSONmessage.temperature, JSONmessage.sensorType)
})

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
/*
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
*/

async function patchSensor(idSensor, nameSensor, valueSensor, capacitySensor){
    try{
        const response = await instance.patch('/sensor',{
            id: idSensor, 
            name: nameSensor,
            value: valueSensor,
            capacity: capacitySensor
        })
        console.log(response)
    } catch(error){
        console.log(error)
    }
}