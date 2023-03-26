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
      {
        products && products.map((product) => {
            return(
            <em key={product.productId}>
              <p>
                {JSON.stringify(product)}
              </p>
            </em>
            )
          }
        )
      }
      {/* <em>
        <p>
          {products}
        </p>
      </em> */}
    </div>
  );
}

export default App;
