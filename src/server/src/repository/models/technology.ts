import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { CorporationEntity } from "./corporation";
import { NewsEntity } from "./news";
import { PatentEntity } from "./patent";
import { Timestamp, TimestampEntity } from "./timestamp";

interface TechnologyAttributes extends Timestamp {
    id: number;
    name: string;
    description: string;
}
interface TechnologyCreationAttributes extends Optional<TechnologyAttributes, "id" | "createdAt" | "updatedAt"> {}
export class TechnologyEntity extends Model<TechnologyAttributes, TechnologyCreationAttributes>
    implements TechnologyAttributes
{
    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

interface TechnologyRelatedCorporationAttributes extends Timestamp {
    description: string;
}
export class TechnologyRelatedCorporationEntity extends Model
    implements TechnologyRelatedCorporationAttributes
{
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function init(sequelize: Sequelize) {
    TechnologyEntity.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ...TimestampEntity
    }, {
        sequelize,
        modelName: "technology"
    });

    TechnologyRelatedCorporationEntity.init({
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ...TimestampEntity
    }, {
        sequelize,
        modelName: "technologyCorporation"
    });
}

export function associate() {
    TechnologyEntity.hasMany(NewsEntity, {
        scope: {
            hostType: "Technology"
        }
    });
    TechnologyEntity.hasMany(PatentEntity);
    CorporationEntity.belongsToMany(TechnologyEntity, {
        through: {
            model: TechnologyRelatedCorporationEntity,
            unique: true,
        },
        constraints: false
    });
    TechnologyEntity.belongsToMany(CorporationEntity, {
        through: {
            model: TechnologyRelatedCorporationEntity,
            unique: true
        },
        constraints: false
    })
}
