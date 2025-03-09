"use strict";
const Models = require("../models");

const getCharacters = (res) => {
  Models.Character.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createCharacter = (data, res) => {
  Models.Character.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateCharacter = (req, res) => {
  Models.Character.update(req.body, { where: { id: req.params.id }, returning: true })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteCharacter = (req, res) => {
  Models.Character.destroy(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
module.exports = {
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
