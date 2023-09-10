import { Entity, Schema } from 'redis-om'
import internal from 'stream';

interface Sensor {
    id: internal;
    name: string;
    value: string;
    capacity: string;
}

class Sensor extends Entity {}

export const sensorSchema = new Schema(Sensor, {
  id: { type: 'number'},
  name: { type: 'string' },
  value: { type: 'string' },
  capacity: { type: 'string' }
})