import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin,
    HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin
} from "sequelize";
import { TechnologyEntity } from "./technology";
import { CorporationEntity } from "./corporation";
import { Timestamp, TimestampEntity } from "./timestamp";

interface ConceptAttributes extends Timestamp {
    id: number;
    name: string;
    description: string;
}
interface ConceptCreationAttributes extends Optional<ConceptAttributes, "id" | "createdAt" | "updatedAt"> {}
export class ConceptEntity extends Model<ConceptAttributes, ConceptCreationAttributes>
    implements ConceptAttributes
{
    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public createCorporation!: HasManyCreateAssociationMixin<CorporationEntity>;
    public addCorporation!: HasManyAddAssociationMixin<CorporationEntity, number>;
    public addCorporations!: HasManyAddAssociationsMixin<CorporationEntity, number>;
    public removeCorporation!: HasManyRemoveAssociationMixin<CorporationEntity, number>;
    public removeCorporations!: HasManyRemoveAssociationsMixin<CorporationEntity, number>;
    public setCorporations!: HasManySetAssociationsMixin<CorporationEntity, number>;
    public countCorporations!: HasManyCountAssociationsMixin;
    public hasCorporation!: HasManyHasAssociationMixin<CorporationEntity, number>;
    public hasCorporations!: HasManyHasAssociationsMixin<CorporationEntity, number>;
    public getCorporations!: HasManyGetAssociationsMixin<CorporationEntity>;

    public createTechnology!: HasManyCreateAssociationMixin<TechnologyEntity>;
    public addTechnology!: HasManyAddAssociationMixin<TechnologyEntity, number>;
    public addTechnologies!: HasManyAddAssociationsMixin<TechnologyEntity, number>;
    public removeTechnology!: HasManyRemoveAssociationMixin<TechnologyEntity, number>;
    public removeTechnologies!: HasManyRemoveAssociationsMixin<TechnologyEntity, number>;
    public setTechnologies!: HasManySetAssociationsMixin<TechnologyEntity, number>;
    public countTechnologies!: HasManyCountAssociationsMixin;
    public hasTechnology!: HasManyHasAssociationMixin<TechnologyEntity, number>;
    public hasTechnologies!: HasManyHasAssociationsMixin<TechnologyEntity, number>;
    public getTechnologies!: HasManyGetAssociationsMixin<TechnologyEntity>;

    // pre-declare possible inclusions, these will only be populated if actively include a relation
    public readonly corporations?: CorporationEntity[];
    public readonly technologies?: TechnologyEntity[];
}

interface ConceptRelatedCorporationAttributes extends Timestamp {
    description: string;
}
interface ConceptRelatedCorporationCreationAttributes extends Optional<ConceptRelatedCorporationAttributes, "createdAt" | "updatedAt"> {}
export class ConceptRelatedCorporationEntity extends Model<any, any>
    implements ConceptRelatedCorporationAttributes
{
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

interface ConceptRelatedTechnologyAttributes extends Timestamp {}
interface ConceptRelatedTechnologyCreationAttributes extends Optional<ConceptRelatedTechnologyAttributes, "createdAt" | "updatedAt"> {}
export class ConceptRelatedTechnologyEntity extends Model<any, any>
    implements ConceptRelatedTechnologyAttributes
{
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

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

    CorporationEntity.belongsToMany(ConceptEntity, {
        through: {
            model: ConceptRelatedCorporationEntity,
            unique: true
        },
        constraints: false
    });
    ConceptEntity.belongsToMany(CorporationEntity, {
        through: {
            model: ConceptRelatedCorporationEntity,
            unique: true,
        },
        constraints: false
    })
}
