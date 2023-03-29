import { useState, useEffect } from 'react';
import AddProductModal from '../components/addProductModal';
import ProductTable from '../components/productTable';
import { Grid , Button, Box, alpha} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

//state management : 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsByDeveloper, fetchProductsByScrumMaster } from './../redux/productReducer';
import { width } from '@mui/system';

//maybe it'd be good to turn this into react component to be able to use lifecycle method componentDidMount to initially fetch all the existing products
function ProductsPage() {

  const dispatch = useDispatch()

  const allProducts = useSelector( store => store.product.products )
  const productsByScrumMaster = useSelector( store => store.product.products_by_scrum_master )
  const productsByDeveloper = useSelector( store => store.product.products_by_developer )

  let [products, setProducts] = useState(allProducts)
  let [scrumMasterNames, setScrumMasterNames] = useState([]) //used for the dropdown, derived from the initial products pull
  let [developerNames, setDeveloperNames] = useState([])     //used foro the dropdown, derived from the initial products pull
  let [scrumMasterSelected, setScrumMasterSelected] = useState("")
  let [developerSelected, setDeveloperSelected] = useState("")

  const handleChangeScrumMasterSelected = (e) => {
    setScrumMasterSelected(e.target.value);
    setDeveloperSelected('');
  };

  const handleDeveloperSelected = (e) => {
    setDeveloperSelected(e.target.value);
    setScrumMasterSelected(''); //did this to eliminate console log warning out of range, as products get reloaded and this scrum master no longer exists as an option
  };

  //load if update, delete , edit succeeds
  useEffect(() => {
    setProducts(allProducts)
  }, [allProducts])

  //load if filter by scrum master
  useEffect(() => {
    setProducts(productsByScrumMaster)
  }, [productsByScrumMaster])

  //load if filter by developer
  useEffect(() => {
    setProducts(productsByDeveloper)
  }, [productsByDeveloper])

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

    setScrumMasterNames(scrum_master_names)
    setDeveloperNames(developer_names)
  }, [products])

  function handleDisplayAllProducts(){
    dispatch(fetchProducts())
    setDeveloperSelected('')
    setScrumMasterSelected('')
  }

  //currently scrum master name hardcoded below in the button
  function handleDisplayProductsByScrumMaster(scrum_master_name){
    dispatch(fetchProductsByScrumMaster(scrum_master_name))
    setDeveloperSelected('')
  }

  //currently developer name hardcoded below in the button
  function handleDisplayProductsByDeveloper(developer_name){
    dispatch(fetchProductsByDeveloper(developer_name))
    setScrumMasterSelected('')
  }

  return (
    <div>

      <Box >
        <h1>
            BC Government Products
          </h1>        
          <p>
            Total number of products : {products.length}
          </p>
      </Box>

      <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      // alignSelf="center"
      sx = {{height:"300px"}}
      >

        <Grid item xs={2} spacing={0}>
          <AddProductModal/>
        </Grid>   
        <Grid item xs={2} spacing={0}>
          <Button sx={{color:'black', width:"90%", bgcolor:"lightblue"}} onClick={handleDisplayAllProducts}>
            Display All Products <VisibilityIcon fontSize='large'/>
          </Button>
        </Grid>   


        <Grid item xs={4} spacing={0}>
            { products.length > 0 &&
              <>
                <InputLabel shrink id="scrum-master-filter-label">By Developer</InputLabel>
                <Select
                  // labelId="scrum-master-filter-label"
                  id="scrum-master-filter"
                  value={developerSelected}
                  label="By Developer"
                  onChange={handleDeveloperSelected}
                  sx={{width:'150px'}}
                >
                  {
                    developerNames.map((developerName) => {
                      return (<MenuItem  key={developerName} value={developerName}>{developerName}</MenuItem>)
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


        <Grid item xs={3} spacing={0}>


          { products.length > 0 &&
            <>
              <InputLabel shrink id="scrum-master-filter-label">By Scrum Master</InputLabel>
              <Select
                labelId="scrum-master-filter-label"
                id="scrum-master-filter"
                value={scrumMasterSelected}
                label="By Scrum Master"
                onChange={handleChangeScrumMasterSelected}
                sx={{width:'150px'}}
              >
                {
                  scrumMasterNames.map((scrumMasterName) => {
                    return (<MenuItem key={scrumMasterName} value={scrumMasterName}>{scrumMasterName}</MenuItem>)
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
