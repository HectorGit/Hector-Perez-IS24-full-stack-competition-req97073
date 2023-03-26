
const express = require("express");
const getrouter = express.Router();
const fs = require('fs');

getrouter.get("/", (req, res) => {
    return res.status(200).send("Welcome to BCGOV API! 🌝");
});

getrouter.get("/healthcheck", (req, res) => {
    return res.status(200).send("Welcome to BCGOV API! 🌝");
});

getrouter.get("/products", 
    async (req, res) => {
        let rawdata = fs.readFileSync('products_data.json');
        let products = JSON.parse(rawdata);
        console.log(products);
        return res.status(200).send(products);
    }
);

getrouter.get("/products_by_scrum_master/:scrum_master_name", (req, res) => {
    let rawdata = fs.readFileSync('products_data.json');
    let products = JSON.parse(rawdata);
    console.log(products);
    return res.status(200).send(products);
});

getrouter.get("/products_by_developer/:developer_name", (req, res) => {
    let rawdata = fs.readFileSync('products_data.json');
    let products = JSON.parse(rawdata);
    console.log(products);
    return res.status(200).send(products);
});



module.exports = getrouter;