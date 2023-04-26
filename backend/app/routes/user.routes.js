module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const asyncify = require('express-asyncify');
    const express = require('express');

    var router = asyncify(express.Router());

    //Create a person
    router.post("/usersC", users.create);

    //Retrieve all people
    router.get("/users", users.findAll);

    //Retrieve a single person with infos
    router.get("/users/:id", users.findOne);

    //Update a person with id
    router.put("/users/:id", users.update);

    //Delete a person with id
    router.delete("/users/:id", users.delete);

    //Delete all people
    router.delete("/users", users.deleteAll);

    app.use('/api/ArtMatch', router);
}