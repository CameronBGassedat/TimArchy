import {createClient} from 'redis';
const REDIS_SERVER = "redis://127.0.0.1:6379";

(async () => {
    const client = createClient(REDIS_SERVER);
    await client.connect();

    client.on('ready', () => {
            console.log("connected to localhost:${REDIS_SERVER}");
    });

    const subscriber = client.duplicate();
    await subscriber.connect();

    let commandReceived;
    let keyReceived;
    let valueReceived;

    await subscriber.pSubscribe("keyevent@0:*", async  (message, channel) => {
        console.log(message.toString(), channel.toString());
        valueReceived = await client.get(message.toString());
        keyReceived = message.toString();
        commandReceived = channel.toString().split(':')[1]
    }, true);
})();