import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'workers' })
export class Worker extends Model<Worker> {
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    position: string;

    @Column({ type: DataType.STRING, allowNull: false })
    profile: string;
}
