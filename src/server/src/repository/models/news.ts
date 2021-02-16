import { NewsHostType } from "@/models";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Timestamp, TimestampEntity} from "./timestamp";

interface NewsAttributes extends Timestamp {
    id: number;
    title: string;
    content: string;
    date: Date;
    hostType: NewsHostType;
}

interface NewsCreationAttributes extends Optional<NewsAttributes, "id" | "createdAt" | "updatedAt"> {}
export class NewsEntity extends Model<NewsAttributes, NewsCreationAttributes>
    implements NewsAttributes
{
    public id!: number;
    public title!: string;
    public content!: string;
    public date!: Date;
    public hostType!: NewsHostType;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function init(sequelize: Sequelize) {
    NewsEntity.init({
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
        hostType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ...TimestampEntity
    }, {
        sequelize,
        modelName: "news",
    });
}
