import { Sequelize, DataTypes, Model } from "sequelize";
import { TechnologyEntity } from "./technology";
import { CorporationEntity } from "./corporation";
import Timestamp from "./timestamp";

export class ConceptEntity extends Model { }
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
        ...Timestamp
    }, {
        sequelize,
        modelName: "concept",
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
        ...Timestamp
    }, {
        sequelize,
        modelName: "conceptCorporation",
    });
    ConceptRelatedTechnologyEntity.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        conceptId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: "uk_concept_technology"
        },
        technologyId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: "uk_concept_technology"
        },
        ...Timestamp
    }, {
        sequelize,
        modelName: "conceptTechnology",
    });
}

export function associate() {
    TechnologyEntity.belongsToMany(ConceptEntity, {
        through: {
            model: ConceptRelatedTechnologyEntity,
            unique: false
        },
        foreignKey: "technologyId",
        constraints: false
    });
    ConceptEntity.belongsToMany(TechnologyEntity, {
        through: {
            model: ConceptRelatedTechnologyEntity,
            unique: false
        },
        foreignKey: "conceptId",
        constraints: false
    });
    ConceptEntity.hasMany(ConceptEntity);
    ConceptEntity.hasMany(ConceptRelatedCorporationEntity);
    CorporationEntity.hasMany(ConceptRelatedCorporationEntity);
}
