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

      <table>
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
        </tr>
        </thead>
        <tbody>
          {
            products && products.map((product) => {
              /* Find a way to map the developers */

              <tr>
                <td>
                  {product.productId}
                </td>
                <td>
                  placeholder
                  {/* {product.productName} */}
                </td>
                <td>
                  placeholder
                  {/* {product.productOwnerName} */}
                </td>
                <td>
                  placeholder
                  {/* <em>
                    <p>
                      {JSON.stringify(product.Developers)}
                    </p>
                  </em> */}
                  {/* {product.Developers} */}
                </td>
                <td>
                  placeholder
                  {/* {product.scrumMasterName} */}
                </td>
                <td>
                  placeholder
                  {/* {product.startDate} */}
                </td>
                <td>
                  placeholder
                  {/* {product.methodology} */}
                </td>
              </tr>

              }
            )
          }

        </tbody>
      </table>


    </div>
  );
}

export default App;
