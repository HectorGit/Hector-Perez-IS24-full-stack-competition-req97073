const fs = require("fs");
const express = require("express");
const deleterouter = express.Router();

deleterouter.delete("/delete_product/:product_id",
    async(req,res) => {

        product_id = req.params.product_id

        let rawdata = fs.readFileSync('products_data.json');
        let products = JSON.parse(rawdata)['all_products'];

        let products_w_product_removed = products.filter(product => product.productId != product_id)
        
        adjusted_content = {
            "all_products" : products_w_product_removed
        }

        console.log('DELETE /delete_product.')

        fs.writeFileSync('products_data.json', JSON.stringify(adjusted_content, null, 2))

        return res.status(200).send(adjusted_content)

    }
);

module.exports = deleterouter;