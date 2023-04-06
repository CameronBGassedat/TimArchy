import { Entity, Schema } from 'redis-om'

interface Room {
    name: string;
    id_building: string;
}

class Room extends Entity {}

export const roomSchema = new Schema(Room, {
  name: { type: 'string' },
  id_building: { type: 'string' }
})