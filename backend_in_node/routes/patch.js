const express = require("express");
const patchrouter = express.Router();
const fs = require('fs')

/*

console.log(parsedContent)

//do stuff to the content
updatedContent = parsedContent

fs.writeFileSync('products_data.json', JSON.stringify(updatedContent, null, 2))

*/

patchrouter.patch("/update_product/:product_id", (req, res) => 
    {

        product_id = req.params.product_id

        //read in the data
        let rawdata = fs.readFileSync('products_data.json');
        let products = JSON.parse(rawdata)['all_products'];
        console.log(products);

        //find the index of the product to update in the array, and the product itself
        indexOfProductToUpdate = products.findIndex(p => p.productId == product_id)
        productToUpdate = products.find(p => p.productId == product_id)

        //caveat, is this iterable ?
        //set the data (if the body doesn't contain it, just use the currently existing data)
        products[indexOfProductToUpdate.productName] = req.body.productName || productToUpdate.productName
        products[indexOfProductToUpdate.productOwnerName] = req.body.productOwnerName || productToUpdate.productOwnerName
        products[indexOfProductToUpdate.Developers] = req.body.Developers || productToUpdate.Developers
        products[indexOfProductToUpdate.scrumMasterName] = req.body.scrumMasterName || productToUpdate.scrumMasterName
        products[indexOfProductToUpdate.startDate] = req.body.startDate || productToUpdate.startDate
        products[indexOfProductToUpdate.methodology] = req.body.methodology || productToUpdate.methodology

        //write the updated data :
        fs.writeFileSync('products_data.json', JSON.stringify(products, null, 2))

    }
);

module.exports = patchrouter;