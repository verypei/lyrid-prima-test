import { Model } from 'sequelize-typescript';
export declare class Users extends Model<Users> {
    email: string;
    password: string;
    role: string;
}
