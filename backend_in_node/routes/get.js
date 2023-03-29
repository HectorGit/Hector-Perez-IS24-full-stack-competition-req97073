
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
        let products = JSON.parse(rawdata)['all_products'];
        console.log('GET /products');
        return res.status(200).send(products);
    }
);

getrouter.get("/products_by_scrum_master/:scrum_master_name", (req, res) => {
    scrum_master_name = req.params.scrum_master_name
    let rawdata = fs.readFileSync('products_data.json');
    let products = JSON.parse(rawdata)['all_products'];
    products_filtered_by_scrum_master_name = products.filter( p => p.scrumMasterName == scrum_master_name)
    console.log('GET /products_by_scrum_master/', scrum_master_name);
    return res.status(200).send(products_filtered_by_scrum_master_name);
});

getrouter.get("/products_by_developer/:developer_name", (req, res) => {
    developer_name = req.params.developer_name
    let rawdata = fs.readFileSync('products_data.json');
    let products = JSON.parse(rawdata)['all_products'];
    products_filtered_by_developer = products.filter( p => p.Developers.find(name => developer_name === name))
    console.log('GET /products_by_developer', developer_name);
    return res.status(200).send(products_filtered_by_developer);
});

module.exports = getrouter;