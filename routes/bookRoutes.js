const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.bookController.getBooks(res);
});

router.post("/create", (req, res) => {
  Controllers.bookController.createBook(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.bookController.updateBook(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.bookController.deleteBook(req, res);
});

module.exports = router;
