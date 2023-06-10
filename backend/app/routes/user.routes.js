module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const asyncify = require('express-asyncify');
    const express = require('express');
    const jwt = require('jsonwebtoken')

    var router = asyncify(express.Router());

    // Middleware d'interception de service
    function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']

        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.status(401).send({ message: "Unauthorized : Wrong authentication Token JWT" })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized : Wrong authentication Token JWT"
                })
            }
            next();
        });
    }

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     description: Create and save a new user with the informations that was given when he tries to create a new account
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               firstname:
     *                 type: string
     *                 description: Le prénom de l'utilisateur.
     *                 example: Alice 
     *               lastname:
     *                 type: string
     *                 description: Le nom de famille de l'utilisateur.
     *                 example: WhiteRabbit 
     *               email:
     *                 type: string
     *                 description: L'e-mail de l'utilisateur.
     *                 example: WhiteRabbit@email.com 
     *               country:
     *                 type: string
     *                 description: Le pays de l'utilisateur.
     *                 example: France
     *               lat:
     *                 type: string
     *                 description: La latitude de l'utilisateur.
     *                 example: 52.5246321 
     *               lng:
     *                 type: string
     *                 description: La longitude de l'utilisateur.
     *                 example: 53.5252314 
     *               password:
     *                 type: string
     *                 description: Le mot de passe de l'utilisateur.
     *                 example: Password
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 user:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                       description: The user ID.
     *                       example: bcb0873d-82aa-4697-af16-02bf0818e394
     *                     firstname:
     *                       type: string
     *                       description: The user's firstname.
     *                       example: Alice 
     *                     lastname:
     *                       type: string
     *                       description: The user's lastname.
     *                       example: WhiteRabbit 
     *                     email:
     *                       type: string
     *                       description: The user's email.
     *                       example: WhiteRabbit@email.com 
     *                     country:
     *                       type: string
     *                       description: The user's country.
     *                       example: France
     *                     lat:
     *                       type: string
     *                       description: The user's latitude.
     *                       example: 52.5246321 
     *                     lng:
     *                       type: string
     *                       description: The user's longitude.
     *                       example: 53.5252314 
     *                     userId:
     *                       type: string
     *                       description: The user's id for the token.
     *                       example: nje52bfez798
     *                     password:
     *                       type: string
     *                       description: The user's password.
     *                       example: $2y$10$xOls3UtPxD1kKnYpdrrDQ.WrxCduQfcF7pGx3ucGbLMOhWYvkXsSm  
     *                 token:
     *                   type: object
     *                   properties:
     *                     accessToken:
     *                       type: string
     *                       description: New token
     *                       example: eyJhbGciOiJIUzI1NiIsIpR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtYWx6YSIsImlhdCI6MTY4NjM2NTA2OSwiZXhwIjoxNjg2MzY2ODY5fQ.sq7UbUVlcYKpJ5E2Mxlv7zGH_5CKVHnlFobnWcsWoxw
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Internal server error : Some error occured while adding a new user"
     *       401:
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Unauthorized : Wrong authentication Token JWT"
     *
    */
    router.post("/users", users.create);

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Retrieve all the people from the database
     *     description: Retrieve all the users from the database and it's only authorized if the token is correct
     *     responses:
     *       200:
     *         description: Get back the list of all users from the database
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: array
     *                   items:
     *                    type: object
     *                    properties:
     *                      id:
     *                        type: string
     *                        description: The user ID.
     *                        example: bcb0873d-82aa-4697-af16-02bf0818e394
     *                      firstname:
     *                        type: string
     *                        description: The user's firstname.
     *                        example: Alice 
     *                      lastname:
     *                        type: string
     *                        description: The user's lastname.
     *                        example: WhiteRabbit 
     *                      email:
     *                        type: string
     *                        description: The user's email.
     *                        example: WhiteRabbit@email.com 
     *                      country:
     *                        type: string
     *                        description: The user's country.
     *                        example: France
     *                      lat:
     *                        type: string
     *                        description: The user's latitude.
     *                        example: 52.5246321 
     *                      lng:
     *                        type: string
     *                        description: The user's longitude.
     *                        example: 53.5252314 
     *                      userId:
     *                        type: string
     *                        description: The user's id for the token.
     *                        example: nje52bfez798
     *                      password:
     *                        type: string
     *                        description: The user's password.
     *                        example: $2y$10$xOls3UtPxD1kKnYpdrrDQ.WrxCduQfcF7pGx3ucGbLMOhWYvkXsSm
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Internal server error : Some error occured while adding a new user"
     *       401:
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Unauthorized : Wrong authentication Token JWT"
     *  
    */
    router.get("/users", authenticateToken, users.findAll);

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Récupérer un utilisateur
     *     description: Récupère les informations d'un utilisateur à partir de la base de données, uniquement autorisé si le jeton est correct.
     *     parameters:
     *       - in: path
     *         name: id
     *         description: ID de l'utilisateur
     *         required: true
     *         schema:
     *           type: string
     *           example: bcb0873d-82aa-4697-af16-02bf0818e394
     *     responses:
     *       200:
     *         description: Informations d'un utilisateur
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 value:
     *                   type: array
     *                   items:
     *                    type: object
     *                    properties:
     *                      id:
     *                        type: string
     *                        description: The user ID.
     *                        example: bcb0873d-82aa-4697-af16-02bf0818e394
     *                      firstname:
     *                        type: string
     *                        description: The user's firstname.
     *                        example: Alice 
     *                      lastname:
     *                        type: string
     *                        description: The user's lastname.
     *                        example: WhiteRabbit 
     *                      email:
     *                        type: string
     *                        description: The user's email.
     *                        example: WhiteRabbit@email.com 
     *                      country:
     *                        type: string
     *                        description: The user's country.
     *                        example: France
     *                      lat:
     *                        type: string
     *                        description: The user's latitude.
     *                        example: 52.5246321 
     *                      lng:
     *                        type: string
     *                        description: The user's longitude.
     *                        example: 53.5252314 
     *                      userId:
     *                        type: string
     *                        description: The user's id for the token.
     *                        example: nje52bfez798
     *                      password:
     *                        type: string
     *                        description: The user's password.
     *                        example: $2y$10$xOls3UtPxD1kKnYpdrrDQ.WrxCduQfcF7pGx3ucGbLMOhWYvkXsSm
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Internal server error : Some error while retrieving user with id=bcb0873d-82aa-4697-af16-02bf0818e394."
     *       401:
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Unauthorized : Wrong authentication Token JWT"
     *  
    */
    router.get("/users/:id", authenticateToken, users.findOne);

    /**
     * @swagger
     * /authentify/{userId}:
     *   post:
     *     summary: Check if an id correspond to a password
     *     description: Check if the user who is trying to log in is in the database and if it correspond to a specific password
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *           example: bcb0873d-82aa-4697-af16-02bf0818e394
     *         required: true
     *         description: The user ID.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               password:
     *                 type: string
     *                 description: The user's password.
     *                 example: Password
     *     responses:
     *       200:
     *         description: user authentificated
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 accessToken:
     *                   type: string
     *                   description: New token
     *                   example: eyJhbGciOiJIUzI1NiIsIpR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtYWx6YSIsImlhdCI6MTY4NjM2NTA2OSwiZXhwIjoxNjg2MzY2ODY5fQ.sq7UbUVlcYKpJ5E2Mxlv7zGH_5CKVHnlFobnWcsWoxw
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Internal server error : Some error occured while verifying your credencials."  
     *       401:
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Unauthorized : Some error occured while verifying your credencials, id and password doesn't correspond."
     * 
    */
    router.post("/authentify/:userId", users.verifyId);

    /**
    * @swagger
    * /users/{id}:
    *   put:
    *     summary: Update the user information
    *     description: Update the informations of the user
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *           example: bcb0873d-82aa-4697-af16-02bf0818e394
    *         required: true
    *         description: The user ID.
    *     responses:
    *       200:
    *         description: Updated
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 user:
    *                   type: object
    *                   properties:
    *                     id:
    *                       type: string
    *                       description: The user ID.
    *                       example: bcb0873d-82aa-4697-af16-02bf0818e394
    *                     firstname:
    *                       type: string
    *                       description: The user's firstname.
    *                       example: Alice 
    *                     lastname:
    *                       type: string
    *                       description: The user's lastname.
    *                       example: WhiteRabbit 
    *                     email:
    *                       type: string
    *                       description: The user's email.
    *                       example: WhiteRabbit@email.com 
    *                     country:
    *                       type: string
    *                       description: The user's country.
    *                       example: France
    *                     lat:
    *                       type: string
    *                       description: The user's latitude.
    *                       example: 52.5246321 
    *                     lng:
    *                       type: string
    *                       description: The user's longitude.
    *                       example: 53.5252314 
    *                     userId:
    *                       type: string
    *                       description: The user's id for the token.
    *                       example: nje52bfez798
    *                     password:
    *                       type: string
    *                       description: The user's password.
    *                       example: $2y$10$xOls3UtPxD1kKnYpdrrDQ.WrxCduQfcF7pGx3ucGbLMOhWYvkXsSm 
    *       500:
    *         description: Internal server error
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Internal server error : Some error occurred while updating user with id=bcb0873d-82aa-4697-af16-02bf0818e394."
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Unauthorized : Wrong authentication Token JWT"
    *
    */
    router.put("/users/:id", authenticateToken, users.update);

    /**
    * @swagger
    * /users/{id}:
    *   delete:
    *     summary: Delete a specific user
    *     description: Delete from a database a specific user
    *     parameters:
    *       - in: path
    *         name: id
    *         description: The ID of the user to delete.
    *         required: true
    *         schema:
    *           type: string
    *           example: bcb0873d-82aa-4697-af16-02bf0818e394
    *     responses:
    *       200:
    *         description: OK
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "OK : User was deleted successfully."
    *       400: 
    *         description: Bad request
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Bad request : Cannot delete user with id=bcb0873d-82aa-4697-af16-02bf0818e394. Maybe user was not found!"
    *       500:
    *         description: Internal server error
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Internal server error : Could not delete user with id=bcb0873d-82aa-4697-af16-02bf0818e394."
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Unauthorized : Wrong authentication Token JWT"
    */
    router.delete("/users/:id", authenticateToken, users.delete);

    /**
     * @swagger
     * /users:
     *   delete:
     *     summary: Delete all the users
     *     description: Delete all the users from the database.2
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "OK : X users were deleted successfully."
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Internal server error : Some error occured while removing all users."
     *       401:
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Unauthorized : Wrong authentication Token JWT"
     */
    router.delete("/users", authenticateToken, users.deleteAll);

    app.use('/api/ArtMatch', router);
}