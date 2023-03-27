import { useState, useEffect } from 'react';
import AddProductModal from '../components/addProductModal';
import ProductTable from '../components/productTable';
import { Grid } from '@mui/material';

function ProductsPage() {

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

      <p>
        Total number of products : {products.length}
      </p>
      
      <AddProductModal/>

      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      >

        <Grid item xs={8}>
          <ProductTable products={products}/>
        </Grid>   
        
      </Grid> 


    </div>
  );
}

export default ProductsPage;
