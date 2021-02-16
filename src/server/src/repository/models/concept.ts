import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin,
    HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin
} from "sequelize";
import { TechnologyEntity } from "./technology";
import { CorporationEntity } from "./corporation";
import { Timestamp } from "./timestamp";

interface ConceptAttributes {
    id: number;
    name: string;
    description: string;
}
interface ConceptCreationAttributes extends Optional<ConceptAttributes, "id"> {}
export class ConceptEntity extends Model<ConceptAttributes, ConceptCreationAttributes>
    implements ConceptAttributes
{
    public id!: number;
    public name!: string;
    public description!: string;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public createRelatedCorporation!: HasManyCreateAssociationMixin<ConceptRelatedCorporationEntity>;
    public addRelatedCorporation!: HasManyAddAssociationMixin<ConceptRelatedCorporationEntity, number>;
    public addRelatedCorporations!: HasManyAddAssociationsMixin<ConceptRelatedCorporationEntity, number>;
    public removeRelatedCorporation!: HasManyRemoveAssociationMixin<ConceptRelatedCorporationEntity, number>;
    public removeRelatedCorporations!: HasManyRemoveAssociationsMixin<ConceptRelatedCorporationEntity, number>;
    public setRelatedCorporations!: HasManySetAssociationsMixin<ConceptRelatedCorporationEntity, number>;
    public countRelatedCorporations!: HasManyCountAssociationsMixin;
    public hasRelatedCorporation!: HasManyHasAssociationMixin<ConceptRelatedCorporationEntity, number>;
    public hasRelatedCorporations!: HasManyHasAssociationsMixin<ConceptRelatedCorporationEntity, number>;
    public getRelatedCorporations!: HasManyGetAssociationsMixin<ConceptRelatedCorporationEntity>;

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
    public readonly corporations?: ConceptRelatedCorporationEntity[];
    public readonly technologies?: TechnologyEntity[];
}

interface ConceptRelatedCorporationAttributes {
    conceptId: number;
    corporationId: number;
    description: string;
}
// interface ConceptRelatedCorporationCreationAttributes extends Optional<ConceptRelatedCorporationAttributes, ""> {}
export class ConceptRelatedCorporationEntity extends Model<ConceptRelatedCorporationAttributes>
    implements ConceptRelatedCorporationAttributes
{
    public conceptId!: number;
    public corporationId!: number;
    public description!: string;

    public readonly corporations?: CorporationEntity[];
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
    }, {
        sequelize,
        modelName: "concept",
    });

    ConceptRelatedCorporationEntity.init({
        conceptId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique:"concept_corporation"
        },
        corporationId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: "concept_corporation"
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: "conceptCorporation",
    });
    ConceptRelatedTechnologyEntity.init({
    }, {
        sequelize,
        modelName: "conceptTechnology",
    });
}

export function associate() {
    ConceptEntity.hasMany(ConceptRelatedCorporationEntity, {
        as: "RelatedCorporations",
        foreignKey: "conceptId"
    });
    ConceptRelatedCorporationEntity.belongsTo(CorporationEntity, {
        foreignKey: "corporationId"
    });

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
}
