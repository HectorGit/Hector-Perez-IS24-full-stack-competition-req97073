import { useState, useEffect } from 'react';
import AddProductModal from '../components/addProductModal';
import ProductTable from '../components/productTable';
import { Grid , Button} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

//maybe it'd be good to turn this into react component to be able to use lifecycle method componentDidMount to initially fetch all the existing products
function ProductsPage() {

  let [products, setProducts] = useState([])
  let [scrumMasterNames, setScrumMasterNames] = useState([]) //used for the dropdown, derived from the initial products pull
  let [developerNames, setDeveloperNames] = useState([])     //used foro the dropdown, derived from the initial products pull
  let [scrumMasterSelected, setScrumMasterSelected] = useState("")
  let [developerSelected, setDeveloperSelected] = useState("")

  const handleChangeScrumMasterSelected = (e) => {
    setScrumMasterSelected(e.target.value);
  };

  const handleDeveloperSelected = (e) => {
    setDeveloperSelected(e.target.value);
  };

  //fetch the data without user having to click a button
  useEffect(() => {
    fetch("http://localhost:3000/api/products", {mode:"cors"})
    .then((response) => response.json() )
    .then((data) => {
      setProducts(data)
      // console.log(data)
    })
    .catch((error) => {
      console.log(error)
    });
  }, [])

  //drafting. extrat this info to use in dropdowns to trigger filtering
  useEffect(() => {

    let scrum_master_names = []
    let developer_names = []

    products.forEach((p) => {
        if (!scrum_master_names.includes(p.scrumMasterName)) {
          scrum_master_names.push(p.scrumMasterName);
        }
    });

    products.forEach((p) => {
      p.Developers.forEach((d)=>{
        if (!developer_names.includes(d)) {
          developer_names.push(d);
        }
      })
    })

    // console.log("scrum_master_names", scrum_master_names)
    setScrumMasterNames(scrum_master_names)
    // console.log("developer_names", developer_names)
    setDeveloperNames(developer_names)
  }, [products])

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
            { products.length > 0 &&
              <>
                <InputLabel id="scrum-master-filter-label">Filter by Developer</InputLabel>
                <Select
                  labelId="scrum-master-filter-label"
                  id="scrum-master-filter"
                  value={developerSelected}
                  label="Developer Selected"
                  onChange={handleDeveloperSelected}
                  sx={{width:'150px'}}
                >
                  {
                    developerNames.map((developerName) => {
                      return (<MenuItem value={developerName}>{developerName}</MenuItem>)
                    })
                  }
                </Select>
                <Button sx={{color:'black', width:'150px', bgcolor:"lightblue", marginY:"15px"}} onClick={()=>handleDisplayProductsByDeveloper(developerSelected)}>
                  Filter <FilterListIcon fontSize='large'/>
                </Button>
                <Button sx={{color:'black', width:'150px', bgcolor:"lightblue", marginY:"15px"}} onClick={handleDisplayAllProducts}>
                  Reset <RestartAltIcon fontSize='large'/>
                </Button>
              </>
            }
          </Grid>


        <Grid item xs={10}>


          { products.length > 0 &&
            <>
              <InputLabel id="scrum-master-filter-label">Filter by Scrum Master</InputLabel>
              <Select
                labelId="scrum-master-filter-label"
                id="scrum-master-filter"
                value={scrumMasterSelected}
                label="Scrum Master Selected"
                onChange={handleChangeScrumMasterSelected}
                sx={{width:'150px'}}
              >
                {
                  scrumMasterNames.map((scrumMasterName) => {
                    return (<MenuItem value={scrumMasterName}>{scrumMasterName}</MenuItem>)
                  })
                }
              </Select>
              <Button sx={{color:'black', width:'150px', bgcolor:"lightblue", marginY:"15px"}} onClick={()=>handleDisplayProductsByScrumMaster(scrumMasterSelected)}>
                Filter <FilterListIcon fontSize='large'/>
              </Button>
              <Button sx={{color:'black', width:'150px', bgcolor:"lightblue", marginY:"15px"}} onClick={handleDisplayAllProducts}>
                Reset <RestartAltIcon fontSize='large'/>
              </Button>
            </>
          }

        </Grid>

        <Grid item xs={10}>
          <ProductTable products={products}/>
        </Grid>   
        
      </Grid> 


    </div>
  );
}

export default ProductsPage;
