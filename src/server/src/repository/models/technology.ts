import { Sequelize, DataTypes, Model } from "sequelize";
import { CorporationEntity } from "./corporation";
import { News } from "./news";
import { Patent } from "./patent";
import Timestamp from "./timestamp";

export class Technology extends Model { }
export class TechnologyRelatedCorporation extends Model { }

export function init(sequelize: Sequelize) {
    Technology.init({
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
        modelName: "technology"
    });

    TechnologyRelatedCorporation.init({
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
        modelName: "technologyCorporation"
    });
}

export function associate() {
    Technology.hasMany(News);
    Technology.hasMany(TechnologyRelatedCorporation);
    Technology.hasMany(Patent);
    CorporationEntity.hasMany(TechnologyRelatedCorporation);
}
