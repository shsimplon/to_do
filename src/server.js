const { request, response } = require("express");
const express = require('express');
const ejs = require('ejs');


const router = require("./routers");

const server = express();

server.engine("ejs", ejs.renderFile);
// utilise ce moteir de rendu ejs 
// renderFile : function 
server.set("views", "./src/views");
server.use(express.static("./src/assets"));

server.use(express.urlencoded({ extended: true }));

server.use(router);
// contient un http et url comme get/, post/...
server.listen(6060, () => {
    console.log("Server running at port 6060");

});