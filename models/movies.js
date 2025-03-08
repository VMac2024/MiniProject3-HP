const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Movie extends Model {}

Movie.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  poster: { type: DataTypes.STRING, allowNull: false },
  series: { type: DataTypes.STRING, allowNull: false },
  bookID: {},
  characterID: {},
});

module.exports = Movie;
