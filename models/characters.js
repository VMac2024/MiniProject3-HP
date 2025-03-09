const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Character extends Model {}

Character.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    wandType: { type: DataTypes.STRING, allowNull: true },
    houseID: {},
    patronous: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
    movieID: {},
    bookID: {},
  },
  {
    sequlize: sequelizeInstance,
    modelName: "characters",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Character;
