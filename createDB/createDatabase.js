const axios = require("axios");
const Models = require("../models");
const movieMapping = require("../utilities/characterMovieLinks");

async function createDatabase() {
  try {
    const count = await Models.Book.count(); //check how many items in database.Make sure this only runs if there is no data yet in the system.
    console.log(`total books: ${count}`);
    if (count === 0) {
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
    const books = await fetchBooks(); //fetches books, stores in variable.
    await Models.Book.bulkCreate(books, { ignoreDuplicates: true });

    const characters = await fetchCharacters(); //fetches characters, stores in variable.
    console.log("First Character: ", characters[0]);
    console.log(`fetched ${characters.length} characters`);
    await Models.HPCharacter.bulkCreate(characters, { ignoreDuplicates: true })
      .then(() => console.log("characters inserted"))
      .catch((e) => console.log("error inserting characters: ", e));

    const houses = await fetchHouses(); //fetches houses, stores in variable.
    console.log("First House: ", houses);

    await Models.House.bulkCreate(houses, { ignoreDuplicates: true })
      .then(() => console.log("houses inserted"))
      .catch((e) => console.log("error inserting houses: ", e));

    const movies = await fetchMovies(); //fetches movies, stores in variable.
    await Models.Movie.bulkCreate(movies, { ignoreDuplicates: true });

    await linkChartoMovies();

    console.log(`database populated successfully`);
  } catch (e) {
    console.error(e);
  }
}

// axios fetch databases:

async function fetchBooks() {
  try {
    const response = await axios.get(`https://api.potterdb.com/v1/books`);
    console.log(response);
    if (!response.data || !response.data.data) {
      throw new Error("Invalid response to fetchBooks");
    }
    return response.data.data.map((book) => ({
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
    const response = await axios.get(`https://api.potterdb.com/v1/characters`);
    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from fetchCharacters");
    }
    let characters = response.data.data
      .filter((char) => character.attributes.name && character.attributes.name.trim() !== "")
      .map((character) => ({
        name: character.attributes.name,
        photo: character.attributes.image,
        patronus: character.attributes.patronus,
      }))
      .slice(0, 1000);

    return characters;
  } catch (e) {
    console.error(e);
    return [];
  }
}
// https://hp-api.onrender.com/api/characters - API data can be fetched, but is not showing in the table for some reason.

async function fetchHouses() {
  try {
    const response = await axios.get(`https://wizard-world-api.herokuapp.com/Houses`);
    console.log(response);
    if (!response.data || !response.data.data) {
      throw new Error("Invalid response to fetchHouses");
    }
    return response.data.data.map((house) => ({
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
    console.log(response);
    if (!response.data || !response.data.data) {
      throw new Error("Invalid response to fetchMovies");
    }
    return response.data.data.map((movie) => ({
      title: movie.attributes.title,
      description: movie.attributes.summary,
      poster: movie.attributes.poster,
      trailer: movie.attributes.trailer,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function linkChartoMovies() {
  try {
    for (const entry of movieMapping) {
      const character = await Models.HPCharacter.findOne({ where: { name: entry.character } });
      if (!character) {
        console.warn(`Character not found: ${entry.character}`);
        continue;
      }

      const movieInstances = [];

      for (const movieTitle of entry.movies) {
        const movie = await Models.Movie.findOne({ where: { title: movieTitle } });

        if (!movie) {
          console.warn(`Movie not found: ${movieTitle}`);
          continue;
        }
        movieInstances.push(movie);
      }
      if (movieInstances.length > 0) {
        await character.setMovies(movieInstances);
        console.log("Character-Movie linked");
      }
    }
  } catch (e) {
    console.error("Error - could not link characters & movies");
  }
}

module.exports = createDatabase;
