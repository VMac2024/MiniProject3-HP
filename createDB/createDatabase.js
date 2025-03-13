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
    let allCharacters = [];
    let page = 1;
    let totalPages = 5; // Fetch at least 5 pages

    while (page <= totalPages) {
      const response = await axios.get(
        `https://api.potterdb.com/v1/characters?filter[house_eq]=Gryffindor&filter[name_start_any]=H,r,l,s,m`,
        {
          params: {
            "page[number]": page, // Fetch next page
            "page[size]": 100, // Max allowed per page
          },
        }
      );

      if (!response.data || !response.data.data || response.data.data.length === 0) {
        break; // Stop fetching if no more data
      }

      allCharacters.push(...response.data.data);
      page++;
    }

    // Process the fetched characters
    let characters = allCharacters
      .map((character) => ({
        name: character.attributes.name,
        photo: character.attributes.image || null,
        patronus: character.attributes.patronus || "unknown",
      }))
      .filter((char) => !char.name.match(/^[0-9A]/)); // Remove names starting with numbers or "A"

    console.log("Filtered Characters:", characters.slice(0, 20)); // Debugging (first 20 results)

    return characters;
  } catch (e) {
    console.error("Error fetching characters:", e);
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
    const characters = await Models.HPCharacter.findAll();
    const movies = await Models.Movie.findAll();

    const movieMap = new Map(movies.map((movie) => [movie.title, movie]));

    let linkedCount = 0;

    for (const character of characters) {
      if (movieMapping.hasOwnProperty(character.name)) {
        const movieInstances = movieMapping[character.name].map((title) => movieMap.get(title)).filter(Boolean); // Remove null movies

        if (movieInstances.length > 0) {
          await character.setMovies(movieInstances);
          linkedCount++;
        } else {
          console.warn(`Skipping ${character.name} - No valid movies found.`);
        }
      } else {
        console.warn(`Skipping ${character.name} - Not in movieMapping.`);
      }
    }

    console.log(`Linked ${linkedCount} characters to movies successfully.`);
  } catch (e) {
    console.error("Error - could not link characters & movies:", e);
  }
}

async function linkBooksMovies() {
  try {
    const books = await fetchBooks();
    const movies = await fetchMovies();

    for (const book of books) {
      const bookRecord = await Models.Book.findOne({
        where: { title: book.title },
      });

      if (!bookRecord) {
        console.warn(`book not in database: ${book.title}`);
        continue; //skip over book if not already in database.
      }
      for (const movie of movies) {
        if (book.title === "Harry Potter and the Deathly Hallows" && (movie.title.includes("Part 1") || movie.title.includes("Part 2"))) {
          await Models.Movie.update({ bookId: bookRecord.id }, { where: { title: movie.title } });
        } else if (movie.title.includes(book.title)) {
          await Models.Movie.update({ BookId: bookRecord.id }, { where: { title: movie.title } });
        }
      }
    }
    console.log("Books & Movies Linked");
  } catch (e) {
    console.error("Error - could not link book to movie", e);
  }
}
async function booklinks() {
  await linkBooksMovies();
}
booklinks();

module.exports = createDatabase;
