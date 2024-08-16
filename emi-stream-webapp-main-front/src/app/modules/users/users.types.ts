import { Role } from "./roles.types";

export interface User
{
    id?: string,
    fullName: string,
    username: string,
    email: string,
    password?: string,
    phone: string,
    createdDate?: Date,
    lastModifiedDate?: Date,
    status: String,
    roles?: Role[]
}
