const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.movieController.getMovies(res);
});

router.post("/create", (req, res) => {
  Controllers.movieController.createMovie(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.movieController.updateMovie(req, res);
});

router.delete("/id:", (req, res) => {
  Controllers.movieController.deleteMovie(req, res);
});

module.exports = router;
