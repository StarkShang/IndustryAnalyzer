import { Sequelize, DataTypes, Model } from "sequelize";
import { Technology } from "./technology";
import { CorporationEntity } from "./corporation";
import Timestamp from "./timestamp";

export class ConceptEntity extends Model { }
export class ConceptRelatedCorporationEntity extends Model { }

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
        }
    }, {
        sequelize,
        modelName: "conceptCorporation",
    });
}

export function associate() {
    ConceptEntity.hasMany(Technology);
    ConceptEntity.hasMany(ConceptEntity);
    ConceptEntity.hasMany(ConceptRelatedCorporationEntity);
    CorporationEntity.hasMany(ConceptRelatedCorporationEntity);
}
