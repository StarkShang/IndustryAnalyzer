import { Sequelize, DataTypes, Model } from "sequelize";
import Timestamp from "./timestamp";

export class News extends Model {}

export function init(sequelize: Sequelize) {
    News.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false
        },
        ...Timestamp
      }, {
        sequelize,
        modelName: "news",
    });
}
