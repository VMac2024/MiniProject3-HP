const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class HPCharacter extends Model {}

HPCharacter.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    student: { type: DataTypes.BOOLEAN, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
    patronous: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "hpCharacter",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = HPCharacter;

/*  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    wandType: { type: DataTypes.STRING, allowNull: true },
    patronous: { type: DataTypes.STRING, allowNull: true },
    photo: { type: DataTypes.STRING, allowNull: true },
  },*/
