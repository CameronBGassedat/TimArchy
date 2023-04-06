import { Entity, Schema } from 'redis-om'

interface User {
    name: string;
    email: string;
    password: string;
}

class User extends Entity {}

export const userSchema = new Schema(User, {
  name: { type: 'string' },
  email: { type: 'string' },
  password: { type: 'string' }
})