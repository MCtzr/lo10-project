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

        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log('sadge')
                return res.sendStatus(401)
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
     *                       example: nje52bfez798
     *       500:
     *         description: error     
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
     *         description: A list of users ( here only one user)
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
     *         description: Some error occurred while retrieving people.
     *     
     *  
    */ 
    router.get("/users", authenticateToken, users.findAll);


    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Retrieve one user
     *     description: Retreive the informations of one user from the database, only authorized if the token is correct
     *     responses:
     *       200:
     *         description: informations of one user
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
     *         description: Error updating person with id= X   
     * 
     */
    router.get("/users/:id", authenticateToken, users.findOne);

    /**
     * @swagger
     * /authentify/{userId}:
     *   post:
     *     summary: Check if the user is already in the database
     *     description: Check if the user who is trying to log in is in the database
     *     responses:
     *       201:
     *         description: user authentificated
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
     *                       example: 0
     *       500: 
     *         description: Some error occurred while retrieving people.      
     * 
    */
    router.post("/authentify/:userId", users.verifyId);

     /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Update the user information
     *     description: Update the informations of the user
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
     *      500:
     *        description: Some error occurred while retrieving people.
     * 
     * 
     *
     */ 
    router.put("/users/:id", authenticateToken, users.update);

     /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Delete a specific user
     *     description: Delete from a database a specific user
     *     responses:
     *       200:
     *         description: Person was deleted successfully.
     *       400: 
     *         description: Cannot delete Person with id ... . Maybe person was not found!
     *       500:
     *         description: Could not delete Person with id=
     
     */
    router.delete("/users/:id", authenticateToken, users.delete);

    /**
     * @swagger
     * /users:
     *   delete:
     *     summary: Delete all the users
     *     description: Delete all the users from the database if the token is true
     *     responses:
     *       200:
     *         description: X people were deleted successfully.
     *       500:
     *         description: Some error occured while removing all people.
     */
    router.delete("/users", authenticateToken, users.deleteAll);


    app.use('/api/ArtMatch', router);
}