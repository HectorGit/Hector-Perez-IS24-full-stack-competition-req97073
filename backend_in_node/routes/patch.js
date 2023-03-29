const express = require("express");
const patchrouter = express.Router();
const fs = require('fs')

patchrouter.patch("/update_product/:product_id", (req, res) => 
    {
        product_id = req.params.product_id

        //read in the data
        let rawdata = fs.readFileSync('products_data.json');
        let products = JSON.parse(rawdata)['all_products'];

        //find the index of the product to update in the array, and the product itself
        indexOfProductToUpdate = products.findIndex(p => p.productId == product_id)
        productToUpdate = products.find(p => p.productId == product_id)

        //caveat, is this iterable ?
        //set the data (if the body doesn't contain it, just use the currently existing data)
        products[indexOfProductToUpdate].productName = req.body.productName || productToUpdate.productName
        products[indexOfProductToUpdate].productOwnerName = req.body.productOwnerName || productToUpdate.productOwnerName
        products[indexOfProductToUpdate].Developers = req.body.Developers || productToUpdate.Developers
        products[indexOfProductToUpdate].scrumMasterName = req.body.scrumMasterName || productToUpdate.scrumMasterName
        products[indexOfProductToUpdate].startDate = req.body.startDate || productToUpdate.startDate
        products[indexOfProductToUpdate].methodology = req.body.methodology || productToUpdate.methodology

        console.log('PATCH /update_product. Updated Product : ' , products[indexOfProductToUpdate])

        adjusted_content = {"all_products":products}

        //write the updated data :
        fs.writeFileSync('products_data.json', JSON.stringify(adjusted_content, null, 2))

        return res.status(200).send(adjusted_content)
    }
);

module.exports = patchrouter;