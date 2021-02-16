import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { ConceptRelatedCorporationEntity } from "./concept";
import { Timestamp, TimestampEntity } from "./timestamp";

interface CorporationAttributes extends Timestamp {
    id: number;
    name: string;
    country: string;
}
interface CorporationCreationAttributes extends Optional<CorporationAttributes, "id" | "createdAt" | "updatedAt"> {}
export class CorporationEntity extends Model<CorporationAttributes, CorporationCreationAttributes>
    implements CorporationAttributes
{
    public id!: number;
    public name!: string;
    public country!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function init(sequelize: Sequelize) {
    CorporationEntity.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ...TimestampEntity
    }, {
        sequelize,
        modelName: "corporation"
    });
}
