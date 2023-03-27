import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

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

  let currentProduct = props.product

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* This should pre-populate the form */
  const [productName, setProductName] = useState(currentProduct.productName)
  const [scrumMasterName, setScrumMasterName] = useState(currentProduct.scrumMasterName)
  const [productOwnerName, setProductOwnerName] = useState(currentProduct.productOwnerName)
  const [Developers, setDevelopers] = useState(currentProduct.Developers)
  const [startDate, setStartDate] = useState(currentProduct.startDate)
  const [methodology, setMethodology] = useState(currentProduct.methodology)
  const formComplete = (productName && scrumMasterName && productOwnerName && Developers && startDate && methodology)

  function handleUpdateProduct(){

    let productId = currentProduct.productId
    console.log("handle_update_product - productId : ", currentProduct.productId)

    let update_data = {
      "productName" : productName,
      "scrumMaster" : scrumMasterName,
      "productOwner" : productOwnerName,
      "developers" : Developers,
      "startDate" : startDate,
      "methodology" : methodology
    }
    console.log(" update data : ", update_data)
    
    fetch(`http://localhost:3000/api/update_product/${productId}`, {
      mode:"cors", 
      method:"PATCH", 
      body: JSON.stringify(update_data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }    
    })
    .then((response) => response.json() )
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    });
    
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
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Scrum Master</FormLabel>
              <TextField 
                fullWidth
                value={scrumMasterName}
                onChange={(event) => setScrumMasterName(event.target.value)}
                variant="outlined" 
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Product Owner</FormLabel>
              <TextField 
                fullWidth
                value={productOwnerName}
                onChange={(event) => setProductOwnerName(event.target.value)}
                variant="outlined" 
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Developers</FormLabel>
              <TextField 
                fullWidth
                value={Developers}
                onChange={(event) => setDevelopers(event.target.value)}
                variant="outlined" 
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Start Date</FormLabel>
              <TextField 
                fullWidth
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                variant="outlined"               
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Methodology</FormLabel>
              <TextField 
                fullWidth
                value={methodology}
                onChange={(event) => setMethodology(event.target.value)}
                variant="outlined" 
              />
            </Grid>

            {/* DISABLE UNTIL FORM COMPLETE */}
            <Grid item xs={12} justifyContent="center" display="flex">

              {formComplete ? 
              <Button fullwidth type="submit" variant="contained" sx={{marginTop:"50px"}} onClick={handleUpdateProduct}>
                Save Changes
              </Button>
              :
              <Button disabled fullwidth type="submit" variant="contained" sx={{marginTop:"50px"}} onClick={handleUpdateProduct}>
                Save Changes
              </Button>}

            </Grid>   
          </Grid>



        </Box>
      </Modal>
    </div>
  );
}

