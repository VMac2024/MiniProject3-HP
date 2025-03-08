"use strict";
const Books = require("./books");
const Characters = require("./characters");
const Houses = require("./houses");
const Movies = require("./movies");

async function init() {
  await Books.sync();
  await Characters.sync();
  await Houses.sync();
  await Movies.sync();
}

init();

//Character.belongsTo(House)
//Character.hasMany(Book)
//Character.hasMany(House)
//House.hasMany(Character)
//Book.hasMany(Character)
//Movie.hasMany(Character)
//Movie.belongsTo(Book)

module.exports = {
  Books,
  Characters,
  Houses,
  Movies,
};
