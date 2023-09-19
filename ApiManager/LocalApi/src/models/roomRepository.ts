import { Entity, Schema } from 'redis-om'
import internal from 'stream';

interface Room {
  id: internal;
  name: string;
  sensors: string[];

  //id_building: string;
}

class Room extends Entity { }

export const roomSchema = new Schema(Room, {
  id: { type: 'number' },
  name: { type: 'string' },
  sensors: { type: 'string[]' },
  //id_building: { type: 'string' }
})