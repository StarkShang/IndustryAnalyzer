import { Sequelize, DataTypes, Model } from "sequelize";
import { Technology } from "./technology";
import { Corporation } from "./corporation";
import Timestamp from "./timestamp";

export class Concept extends Model {}
export class ConceptRelatedCorporation extends Model {}

export function init(sequelize: Sequelize) {
    Concept.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        ...Timestamp
      }, {
        sequelize,
        modelName: "concept",
    });
    ConceptRelatedCorporation.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
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
    Concept.hasMany(Technology);
    Concept.hasMany(Concept);
    Concept.hasMany(ConceptRelatedCorporation);
    ConceptRelatedCorporation.hasOne(Corporation);
}
