import { Sequelize, DataTypes, Model } from "sequelize";
import { CorporationEntity } from "./corporation";
import { News } from "./news";
import { Patent } from "./patent";
import Timestamp from "./timestamp";

export class TechnologyEntity extends Model { }
export class TechnologyRelatedCorporation extends Model { }

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
    TechnologyEntity.hasMany(News);
    TechnologyEntity.hasMany(TechnologyRelatedCorporation);
    TechnologyEntity.hasMany(Patent);
    CorporationEntity.hasMany(TechnologyRelatedCorporation);
}
