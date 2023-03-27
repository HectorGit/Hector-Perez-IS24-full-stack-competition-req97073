const express = require("express");
const patchrouter = express.Router();

patchrouter.patch("/update_product/:product_id", (req, res) => 
    {
        
        // product_id = req.params.product_id

        // //PSEUDOCODE

        // // //read in the dummy data (faux-database)
        // // FileSystem.read
        // // products = []

        // // find existing data for ID (there will be, since only could've come from the frontend) [on postman, could fail bc ID could not be tied to graphical unit]
        // product_to_update = products.find(p => p.productId == product_id) //find or filter (will have to test this)

        // // prepare updated project entry by reading the request body
        // //if there isn't something in the request body, replace it with current data in the product entry
        // new_project = {
        //     //'productId':req.body.productId || products[id].productId,
        //     'productName':req.body.productName || product_to_update.productName,
        //     'productOwnerName':req.body.productOwnerName || product_to_update.productOwnerName,
        //     'Developers':req.body.Developers || product_to_update.Developers,
        //     'scrumMasterName':req.body.scrumMasterName || product_to_update.scrumMasterName,
        //     'startDate':req.body.startDate || product_to_update.startDate,
        //     'methodology':req.body.methodology || product_to_update.methodology
        // }

        // //copy all the existing data(?) and affect the copy w/ the updates
        // //write the updated data to the file.
        // // FileSystem.write

    }
);

module.exports = patchrouter;