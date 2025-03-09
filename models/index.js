"use strict";
const Book = require("./books");
const Character = require("./characters");
const House = require("./houses");
const Movie = require("./movies");

async function init() {
  await Book.sync();
  await Character.sync();
  await House.sync();
  await Movie.sync();
}

init();

Character.belongsTo(House);
Character.hasMany(Book);
Character.hasMany(House);
House.hasMany(Character);
Book.hasMany(Character);
Movie.hasMany(Character);
Movie.belongsTo(Book);

module.exports = {
  Book,
  Character,
  House,
  Movie,
};
