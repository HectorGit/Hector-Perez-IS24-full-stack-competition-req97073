const express = require("express");
const postrouter = express.Router();

/**
 * The body will contain : {
 * 
 * 
        productName: STRING,
        productOwnerName: STRING,
        Developers: ARRAY of STRING
        scrumMasterName: STRING,
        startDate: STRING IN THE FORM "YYYY/MM/DD",
        methodology: STRING 
 * 
 * }
 */
postrouter.post("/add_new_project",
    async(req,res) => {

        //PSEUDOCODE

        // //read in the dummy data (faux-database)
        // FileSystem.read
        // products = []

        // //prepare new project entry by reading all data from request body

        // new_project = {
        //     'productName':req.body.productName,
        //     'productOwnerName':req.body.productOwnerName,
        //     'Developers':req.body.Developers,
        //     'scrumMasterName':req.body.scrumMasterName,
        //     'startDate':req.body.startDate,
        //     'methodology':req.body.methodology
        // }

        // //figure out the 'next' appropriate id to use. find max, and +1 it.
        // new_index = products.max(productId) + 1
        // new_project['productId'] = new_index

        // //write the new entry to the dummy data
        // FileSystem.write
    }
);

module.exports = postrouter;