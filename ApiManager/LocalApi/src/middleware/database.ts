import { Client, Entity, Schema } from 'redis-om'



export const client = new Client()

export default async () => {
    const url = process.env.REDIS_URL || "redis://redis:6379"
    const redisConn = await client.open(url)
    const dbCheck = await client.execute(['PING']);
    console.log(dbCheck)
    return redisConn
}

interface Sensor {
    name: string;
    value: string;
    capacity: string;
}

class Sensor extends Entity {}

export const sensorSchema = new Schema(Sensor, {
  name: { type: 'string' },
  value: { type: 'string' },
  capacity: { type: 'string' }
})

