"use strict";
const Book = require("./book");
const Character = require("./character");
const House = require("./house");
const Movie = require("./movie");

async function init() {
  await Book.sync();
  await Character.sync();
  await House.sync();
  await Movie.sync();
}

init();

Character.belongsTo(House);
Character.hasMany(Book);
Character.hasMany(Movie);
House.hasMany(Character);
Book.hasMany(Character);
Movie.hasMany(Character);
Movie.belongsTo(Book);
Book.hasOne(Movie);

module.exports = {
  Book,
  Character,
  House,
  Movie,
};
