const express = require("express");
const patchrouter = express.Router();

patchrouter.patch("/update_product/:id", (req, res) => 
    {
 
        //pseudocode, read the data, 
        //find the data with that product id
        //try to write the new data to the json file
         
        var product_id = req.params.id
        console.log("product id:" , product_id)
        return res.status(200).send("updated the product !");
    }
);

module.exports = patchrouter;