const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class House extends Model {}

House.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    houseName: { type: DataTypes.STRING, allowNull: false },
    founder: { type: DataTypes.STRING, allowNull: false },
    houseColours: { type: DataTypes.STRING, allowNull: false },
    houseGhost: { type: DataTypes.STRING, allowNull: false },
    mascot: { type: DataTypes.STRING, allowNull: false },
    commonRoom: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "house",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = House;
