const { Router } = require("express");
const { cp } = require("fs");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1800 });
}

//Create and Save a new Person
exports.create = async (req, res) => {

    const { firstName, lastName, email, country, lat, lng, userId, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // hachez le mot de passe avec bcrypt et une salage de 10

        const newUser = await User.create({
            id: uuid(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            country: country,
            lat: lat,
            lng: lng,
            userId: userId,
            password: hashedPassword,
        }); // créez un nouvel utilisateur dans la base de données en utilisant le modèle User et le mot de passe haché

        const accessToken = generateAccessToken({ userId });

        res.send({
            accessToken,
        });
    } catch (error) {
        console.log(error);
    }
};

//retrieve all people from the database
exports.verifyId = (req, res) => {
    const id = req.params.userId;
    const clearPassword = req.body.password;

    db.sequelize.query(`SELECT * FROM users WHERE userId = '${id}'`)
        .then(data => {
            const hashedPass = data[0][0].password
            bcrypt.compare(clearPassword, hashedPass, function (err, result) {
                if (err) {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving people."
                    });
                }
                if (result === true) {
                    const accessToken = generateAccessToken({ id });

                    res.send({
                        accessToken,
                    });
                } else {
                    res.json({ result: false });
                }
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving people."
            });
        });

}

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

    db.sequelize.query(`SELECT * FROM users WHERE userId = '${id}'`)
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

    console.log("test")
    const id = req.params.id;

    const { firstName, lastName, email, country, lat, lng, } = req.body;

    db.sequelize.query(`UPDATE users SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', country = '${country}', lat = '${lat}', lng = '${lng}' WHERE userId = '${id}'`)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving people."
            });
        });
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