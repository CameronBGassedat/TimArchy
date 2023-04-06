import { Entity, Schema } from 'redis-om'

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