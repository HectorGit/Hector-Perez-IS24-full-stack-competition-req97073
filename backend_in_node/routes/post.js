const express = require("express");
const postrouter = express.Router();

// postrouter.post("/wake_up_api",
//     async(req,res) => {
//         console.log('waking up api...')
//         return res.status(200).send({"status":'woken'})
//     }
// );

module.exports = postrouter;