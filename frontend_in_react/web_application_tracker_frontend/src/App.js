import { useState, useEffect } from 'react';

function App() {

  let [products, setProducts] = useState([])
  
  function handleClick(){

    console.log("clicked, fetching the data")

    fetch("http://localhost:3000/api/products", {mode:"cors"})
    .then((response) => response.json() )
    .then((data) => {
      setProducts(data['all_products'])
      console.log(data['all_products'])
    })
    .catch((error) => {
      console.log(error)
    });
  }

  return (
    <div>
      <button onClick={handleClick}>
        Fetch The Products
      </button>

      <h1>
        BC Government Products
      </h1>

      <h1>
        Total number of products : {products.length}
      </h1>

      <table style={{border:"2px black solid"}}>
        <thead>
        <tr>
          <th>
            Product Number
          </th>
          <th>
            Product Name
          </th>
          <th>
            Scrum Master
          </th>
          <th>
            Product Owner
          </th>
          <th>
            Developer Names
          </th>
          <th>
            Start Date
          </th>
          <th>
            Methodology
          </th>
        </tr>
        </thead>
        <tbody>
          {
            products && products.map((product) => {
              /* Find a way to map the developers */
              return(
                <tr>
                  <td>
                    {product.productId}
                  </td>
                  <td>
                    {product.productName}
                  </td>
                  <td>
                    {product.scrumMasterName}
                  </td>
                  <td>
                    {product.productOwnerName}
                  </td>
                  <td>
                    <ul style={{listTypeStyle:"none"}}>
                    {product.Developers.map((developer_name) => {
                      return(
                        <li>
                          {developer_name}
                        </li>
                      )
                    })}
                    </ul>
                  </td>
                  <td>
                    {product.startDate}
                  </td>
                  <td>
                    {product.methodology}
                  </td>
                </tr>
              )

              }
            )
          }

        </tbody>
      </table>


    </div>
  );
}

export default App;
