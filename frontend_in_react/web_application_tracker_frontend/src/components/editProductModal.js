import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Stack } from '@mui/system';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

//state management : 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,fetchUpdateProduct } from '../redux/productReducer';

import{
  FormLabel,
  TextField,
  Grid
} from "@mui/material"

import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditProductModal(props) {

  const dispatch = useDispatch()

  dayjs.extend(customParseFormat)

  let currentProduct = props.product

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* This should pre-populate the form */
  const [productName, setProductName] = useState(currentProduct.productName)
  const [scrumMasterName, setScrumMasterName] = useState(currentProduct.scrumMasterName)
  const [productOwnerName, setProductOwnerName] = useState(currentProduct.productOwnerName)
  const [developerToAdd,setDeveloperToAdd] = useState("")
  const [Developers, setDevelopers] = useState(currentProduct.Developers)
  const [startDate, setStartDate] = useState(dayjs(currentProduct.startDate));
  const [methodology, setMethodology] = useState(currentProduct.methodology)
  const formComplete = (productName && scrumMasterName && productOwnerName && Developers.length <= 5 && startDate && methodology)

  const handleMethodologySelected = (e) => {
    setMethodology(e.target.value);
  };

  function handleChangeDeveloperToAdd(e){
    setDeveloperToAdd(e.target.value);//clear it
  };

  function handleAddDeveloper(){
    if(Developers.length >= 5){
      alert("Whoops ! - Only up to 5 developers are allowed per project !")
    }else{
      if(developerToAdd!=""){
        setDevelopers([...Developers, developerToAdd])
        setDeveloperToAdd("");//clear it
        console.log("after add:",Developers)
      }
    }
  };

  function handleRemoveDeveloper(developer){
    console.log("developer to remove : ", developer)
    setDevelopers(Developers.filter( d => d != developer))
    console.log("after remove:",Developers)
  };

  function handleUpdateProduct(){

    let productId = currentProduct.productId

    let request_body = {
      "productName" : productName,
      "scrumMaster" : scrumMasterName,
      "productOwner" : productOwnerName,
      "Developers" : Developers,
      "startDate" : startDate.format('YYYY-MM-DD'),
      "methodology" : methodology
    }
    console.log(" request_body: ", request_body)
    
    dispatch(fetchUpdateProduct([productId,request_body]))
    dispatch(fetchProducts())
    handleClose()

  }

  return (
    <div>
      <Button sx={{color:"black"}}onClick={handleOpen}>
        <EditIcon fontSize='medium'/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid 
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >

            <Grid item xs={12}>
              <Typography variant="h3">
                Edit Product
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Product Name</FormLabel>
              <TextField 
                fullWidth
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                variant="outlined" 
                inputProps={{maxLength:50}}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Scrum Master</FormLabel>
              <TextField 
                fullWidth
                value={scrumMasterName}
                onChange={(event) => setScrumMasterName(event.target.value)}
                variant="outlined" 
                inputProps={{maxLength:50}}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Product Owner</FormLabel>
              <TextField 
                fullWidth
                value={productOwnerName}
                onChange={(event) => setProductOwnerName(event.target.value)}
                variant="outlined" 
                inputProps={{maxLength:50}}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Developers</FormLabel>
              <Stack direction="row" spacing={1}>
                <TextField fullWidth id="addDeveloperTextField" value={developerToAdd} onChange={handleChangeDeveloperToAdd} variant="outlined" />
                <Button disabled={ Developers.length >= 5 } type='button' variant="contained" onClick={handleAddDeveloper}>Add <AddCircleIcon fontSize='small'/></Button>
              </Stack>
            </Grid>

            <Grid item xs = {12}>
              { Developers.length > 0 && Developers.map( (developer) => {
                  return(
                    <Stack key={"stack-"+developer} direction = "row" >
                      <Typography>{developer}</Typography>
                      <Button type="button" variant="contained" onClick={()=>handleRemoveDeveloper(developer)}><PersonRemoveIcon fontSize='small'/></Button>
                    </Stack>
                  )
                })
              }
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Start Date</FormLabel>
              <DateField
                fullWidth
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                format="YYYY-MM-DD"
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Methodology</FormLabel>
              
                <Select
                  fullWidth
                  labelId="methodology-label"
                  id="methodology-filter"
                  value={methodology}
                  label="Methodology"
                  onChange={handleMethodologySelected}
                >
                  <MenuItem value={'Waterfall'}>Waterfall</MenuItem>
                  <MenuItem value={'Agile'}>Agile</MenuItem>
                </Select>

            </Grid>

            {/* DISABLE UNTIL FORM COMPLETE */}
            <Grid item xs={12} justifyContent="center" display="flex">

              {formComplete ? 
              <Button type="submit" variant="contained" sx={{marginTop:"50px"}} onClick={handleUpdateProduct}>
                Save Changes
              </Button>
              :
              <Button disabled type="submit" variant="contained" sx={{marginTop:"50px"}} onClick={handleUpdateProduct}>
                Save Changes
              </Button>}

            </Grid>   
          </Grid>



        </Box>
      </Modal>
    </div>
  );
}

