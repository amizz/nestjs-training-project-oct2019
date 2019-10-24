import { Schema } from "mongoose";

export const UsersSchema = new Schema({
    email: String,
    password: String,
    name: String,
    active: Boolean,
    token: Array
})

export class UserDto {
    readonly email: String
    readonly password: String
    readonly name: String
    readonly active: Boolean
    readonly token: Array<any>
}

export class UserInterface {
    email: String
    password: String
    name: String
    active: Boolean
    token: Array<any>
}