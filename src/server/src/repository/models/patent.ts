import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { CorporationEntity } from "./corporation";
import { Timestamp, TimestampEntity } from "./timestamp";

interface PatentAttributes extends Timestamp {
    id: number;
    title: string;
    number: string;
    applyDate: Date;
    publicDate: Date | null;
}
interface PatentCreationAttributes extends Optional<PatentAttributes, "id" | "createdAt" | "updatedAt"> {}
export class PatentEntity extends Model<PatentAttributes, PatentCreationAttributes>
    implements PatentAttributes
{
    public id!: number;
    public title!: string;
    public number!: string;
    public applyDate!: Date;
    public publicDate!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function init(sequelize: Sequelize) {
    PatentEntity.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        applyDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        publicDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ...TimestampEntity
    }, {
        sequelize,
        modelName: "patent",
    });
}

export function associate() {
    PatentEntity.hasOne(CorporationEntity);
}
