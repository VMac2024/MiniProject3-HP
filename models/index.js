"use strict";
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

const Book = require("./book");
const HPCharacter = require("./hpCharacter");
const House = require("./house");
const Movie = require("./movie");

/*async function init() {
  await Book.sync();
  await HPCharacter.sync();
  await House.sync();
  await Movie.sync();
}

init(); - PER DISCUSSION WITH JO, REMOVE THIS PART. */

HPCharacter.belongsTo(House);
HPCharacter.belongsToMany(Movie, { through: "appearances" });
House.hasMany(HPCharacter);
Movie.hasMany(HPCharacter, { through: "appearances" });
Movie.belongsTo(Book);
Book.hasMany(Movie); //have noted this as "hasMany" due to the last HP Book being split into two movies.

sequelizeInstance.sync();

module.exports = {
  Book,
  HPCharacter,
  House,
  Movie,
};

//create a new model for wand: Wood, Core & Length. Only one wand to each character. (one to one)
