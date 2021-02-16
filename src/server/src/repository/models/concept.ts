import { Sequelize, DataTypes, Model, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from "sequelize";
import { TechnologyEntity } from "./technology";
import { CorporationEntity } from "./corporation";
import TimestampEntity, { Timestamp } from "./timestamp";

// export class ConceptEntity extends Model { }
export interface ConceptAttributes extends Timestamp {
    id: number;
    name: string;
    description: string;
}
interface ConceptCreationAttributes extends Optional<ConceptAttributes, "id" | "createdAt" | "updatedAt"> {}
export class ConceptEntity extends Model<ConceptAttributes, ConceptCreationAttributes> implements ConceptAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public getTechnologies!: HasManyGetAssociationsMixin<TechnologyEntity>; // Note the null assertions!
    public addTechnology!: HasManyAddAssociationMixin<TechnologyEntity, number>;
    public hasTechnology!: HasManyHasAssociationMixin<TechnologyEntity, number>;
    public countTechnologies!: HasManyCountAssociationsMixin;
    public createTechnology!: HasManyCreateAssociationMixin<TechnologyEntity>;

    // pre-declare possible inclusions, these will only be populated if actively include a relation
    public readonly technologies?: TechnologyEntity[];

}
export class ConceptRelatedCorporationEntity extends Model { }
export class ConceptRelatedTechnologyEntity extends Model {}

export function init(sequelize: Sequelize) {
    ConceptEntity.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        ...TimestampEntity
    }, {
        sequelize,
        modelName: "concept"
    });

    ConceptRelatedCorporationEntity.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ...TimestampEntity
    }, {
        sequelize,
        modelName: "conceptCorporation",
    });
    ConceptRelatedTechnologyEntity.init({
        ...TimestampEntity
    }, {
        sequelize,
        modelName: "conceptTechnology",
    });
}

export function associate() {
    TechnologyEntity.belongsToMany(ConceptEntity, {
        through: {
            model: ConceptRelatedTechnologyEntity,
            unique: true
        },
        constraints: false
    });
    ConceptEntity.belongsToMany(TechnologyEntity, {
        through: {
            model: ConceptRelatedTechnologyEntity,
            unique: true
        },
        constraints: false
    });

    ConceptEntity.hasMany(ConceptRelatedCorporationEntity);
    ConceptRelatedCorporationEntity.hasOne(CorporationEntity);
}
