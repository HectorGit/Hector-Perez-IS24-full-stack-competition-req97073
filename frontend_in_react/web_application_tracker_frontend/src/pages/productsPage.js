import { useState, useEffect } from 'react';
import AddProductModal from '../components/addProductModal';
import ProductTable from '../components/productTable';
import { Grid , Button} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ProductsPage() {

  let [products, setProducts] = useState([])
  
  function handleDisplayAllProducts(){

    console.log("clicked, fetching the data")

    fetch("http://localhost:3000/api/products", {mode:"cors"})
    .then((response) => response.json() )
    .then((data) => {
      setProducts(data)
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  //currently scrum master name hardcoded below in the button
  function handleDisplayProductsByScrumMaster(scrum_master_name){

    console.log("by scrum master : ", scrum_master_name)

    fetch(`http://localhost:3000/api/products_by_scrum_master/${scrum_master_name}`, {mode:"cors"})
    .then((response) => response.json() )
    .then((data) => {
      setProducts(data)
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  //currently developer name hardcoded below in the button
  function handleDisplayProductsByDeveloper(developer_name){

    console.log("by developer", developer_name)

    fetch(`http://localhost:3000/api/products_by_developer/${developer_name}`, {mode:"cors"})
    .then((response) => response.json() )
    .then((data) => {
      setProducts(data)
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  return (
    <div>

      <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      >
        <Grid item xs={10}>
          <h1>
            BC Government Products
          </h1>        
          <p>
            Total number of products : {products.length}
          </p>
        </Grid>   

        <Grid item xs={10}>
          <AddProductModal/>
        </Grid>   

        <Grid item xs={10}>
          <Button sx={{color:'black', width:'300px', bgcolor:"lightblue", marginY:"15px"}} onClick={handleDisplayAllProducts}>
            Display All Products <VisibilityIcon fontSize='large'/>
          </Button>
        </Grid>

        <Grid item xs={10}>
          <Button sx={{color:'black', width:'300px', bgcolor:"lightblue", marginY:"15px"}} onClick={()=>handleDisplayProductsByDeveloper('Harriett')}>
            Display Products By Selected Developer <VisibilityIcon fontSize='large'/>
          </Button>
        </Grid>


        <Grid item xs={10}>
          <Button sx={{color:'black', width:'300px', bgcolor:"lightblue", marginY:"15px"}} onClick={()=>handleDisplayProductsByScrumMaster('Pierce')}>
            Display Products By Selected Scrum Master <VisibilityIcon fontSize='large'/>
          </Button>
        </Grid>

        <Grid item xs={10}>
          <ProductTable products={products}/>
        </Grid>   
        
      </Grid> 


    </div>
  );
}

export default ProductsPage;
