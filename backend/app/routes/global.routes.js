module.exports = async app => {
    const globals = require("../controllers/global.controller.js");
    const asyncify = require('express-asyncify');
    const express = require('express');

    var router = asyncify(express.Router());

    router.get("/globals", globals.getAll);

    router.delete("/globals", globals.deleteAll);

    app.use('/api/ArtMatch', router);
}