const axios = require("axios");
const Models = require("../models");

async function createDatabase() {
  try {
    const count = await Models.Book.findAndCountAll(); //check how many items in database.Make sure this only runs if there is no data yet in the system.
    console.log(`total books: ${count}`);
    if (count.count == 0) {
      //CHECK CODE - COUNT ON ITS OWN OR COUNT.COUNT?
      await populateDatabase();
      console.log("Fetch completed. Database loaded.");
    } else {
      console.log("Data already in database");
    }
  } catch (e) {
    console.error(e);
  }
}

async function populateDatabase() {
  try {
    const books = await fetchBooks();
    const characters = await fetchCharacters();
    const houses = await fetchhouses();
    const movies = await fetchMovies();

    console.log(`database populated successfully`);
  } catch (e) {
    console.error(e);
  }
}

// axios fetch databases:

async function fetchBooks() {
  try {
    const response = await axios.get(`https://api.potterdb.com/v1/books`);
    return response.data.map((book) => ({
      title: book.attributes.title,
      description: book.attributes.summary,
      cover: book.attributes.cover,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function fetchCharacters() {
  try {
    const response = await axios.get(`https://hp-api.onrender.com/api/characters`);
    return response.data.map((character) => ({
      name: character.name,
      student: character.hogwartsStudent,
      photo: character.image,
      patronous: character.patronus,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function fetchhouses() {
  try {
    const response = await axios.get(`https://wizard-world-api.herokuapp.com/Houses`);
    return response.data.map((house) => ({
      houseName: house.name,
      founder: house.founder,
      houseColours: house.houseColours,
      houseGhost: house.ghost,
      mascot: house.animal,
      commonRoom: house.commonRoom,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function fetchMovies() {
  try {
    const response = await axios.get(`https://api.potterdb.com/v1/movies`);
    return response.data.map((movie) => ({
      title: movie.title,
      description: movie.summary,
      poster: movie,
      trailer: movie.url,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

module.exports = createDatabase;
