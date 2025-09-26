import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { RoleType } from 'src/enum/role.enum';

@Table({ tableName: 'users' })
export class Users extends Model<Users> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: RoleType.USER,
    })
    role: string;
}
