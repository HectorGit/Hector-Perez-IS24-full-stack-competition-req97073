const fs = require('fs')

console.log("running the js file !")

let rawContent = fs.readFileSync('products_data.json').toString()
let parsedContent = JSON.parse(rawContent)

console.log(parsedContent)

//do stuff to the content
updatedContent = parsedContent

fs.writeFileSync('products_data.json', JSON.stringify(updatedContent, null, 2))

