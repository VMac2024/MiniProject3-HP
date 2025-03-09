const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Book extends Model {}

Book.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    cover: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "book",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Book;
