const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.characterController.getCharacters(res);
});

router.post("/create", (req, res) => {
  Controllers.characterController.createCharacter(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.characterController.updateCharacter(req, res);
});

router.delete("/id:", (req, res) => {
  Controllers.characterController.deleteCharacter(req, res);
});

module.exports = router;
