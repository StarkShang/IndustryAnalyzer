import { Sequelize, DataTypes, Model } from "sequelize";
import { CorporationEntity } from "./corporation";
import Timestamp from "./timestamp";

export class Patent extends Model {}

export function init(sequelize: Sequelize) {
    Patent.init({
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
        ...Timestamp
      }, {
        sequelize,
        modelName: "patent",
    });
}

export function associate() {
    Patent.hasOne(CorporationEntity);
}
