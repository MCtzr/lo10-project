module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const asyncify = require('express-asyncify');
    const express = require('express');
    const jwt = require('jsonwebtoken')

    var router = asyncify(express.Router());

    // Middleware d'interception de service

    function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']

        console.log(authHeader)

        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401)

        console.log(process.env.ACCESS_TOKEN_SECRET)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log('sadge')
                return res.sendStatus(401)
            }
            next();
        });

    }

    //Create a person
    router.post("/users", users.create);

    //Retrieve all people
    router.get("/users", authenticateToken, users.findAll);

    //Retrieve a single person with infos
    router.get("/users/:id", authenticateToken, users.findOne);

    //Retrieve a single person with infos
    router.post("/authentify/:userId", users.verifyId);

    //Update a person with id
    router.put("/users/:id", authenticateToken, users.update);

    //Delete a person with id
    router.delete("/users/:id", authenticateToken, users.delete);

    //Delete all people
    router.delete("/users", authenticateToken, users.deleteAll);


    app.use('/api/ArtMatch', router);
}