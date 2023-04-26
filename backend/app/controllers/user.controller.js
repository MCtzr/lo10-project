const { Router } = require("express");
const { cp } = require("fs");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
const { uuid } = require('uuidv4');

//Create and Save a new Person
exports.create = async (req, res) => {

};

//retrieve all people from the database
exports.findAll = (req, res) => {
    const id = req.query.id;

    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving people."
            });
        });
};

//Find a single Person with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    db.sequelize.query(`SELECT * FROM users WHERE id = '${id}'`)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating person with id=" + id
            });
        });
};


//Update a person by the id in the request
exports.update = async (req, res) => {

};


//Delete a person with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    Employee.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Person was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete Person with id=${id}. Maybe person was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Person with id=" + id
            });
        });
};


//Delete all people from the database
exports.deleteAll = async (req, res) => {

    await User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} people were deleted successfully.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all people."
            });
        });
};