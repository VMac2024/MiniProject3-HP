"use strict";
const Book = require("./book");
const HPCharacter = require("./hpCharacter");
const House = require("./house");
const Movie = require("./movie");

async function init() {
  await Book.sync();
  await HPCharacter.sync();
  await House.sync();
  await Movie.sync();
}

init();

HPCharacter.belongsTo(House);
HPCharacter.hasMany(Book);
HPCharacter.hasMany(Movie);
House.hasMany(HPCharacter);
Book.hasMany(HPCharacter);
Movie.hasMany(HPCharacter);
Movie.belongsTo(Book);
Book.hasOne(Movie);

module.exports = {
  Book,
  HPCharacter,
  House,
  Movie,
};
