const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.houseController.getHouses(res);
});

router.post("/create", (req, res) => {
  Controllers.houseController.createHouse(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.houseController.updateHouse(req, res);
});

router.delete("/id:", (req, res) => {
  Controllers.houseController.deleteHouse(req, res);
});

module.exports = router;
