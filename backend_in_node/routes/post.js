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

        //read in the data
        let rawdata = fs.readFileSync('products_data.json');
        let products = JSON.parse(rawdata)['all_products'];
        console.log(products);

        //find highest index, and add 1 to it to create the new product id
        maxIdProductIndex = products.reduce((a,b)=>a.productId>b.productId.y?a:b).productId

        console.log("productIdToUseToStoreWithoutClash: ", maxIdProductIndex+1)

        //add new entry to the products
        products.push({
            'productId':maxIdProductIndex+1,
            'productName':req.body.productName,
            'productOwnerName':req.body.productOwnerName,
            'Developers':req.body.Developers,
            'scrumMasterName':req.body.scrumMasterName,
            'startDate':req.body.startDate,
            'methodology':req.body.methodology
        })

        fs.writeFileSync('products_data.json', JSON.stringify(products, null, 2))

    }
);

module.exports = postrouter;