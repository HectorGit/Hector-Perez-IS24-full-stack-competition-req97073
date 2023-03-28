import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

export default function AddProductModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [productName, setProductName] = useState("")
  const [scrumMasterName, setScrumMasterName] = useState("")
  const [productOwnerName, setProductOwnerName] = useState("")
  const [Developers, setDevelopers] = useState([])
  const [startDate, setStartDate] = useState("")
  const [methodology, setMethodology] = useState("")
  const formComplete = (productName && scrumMasterName && productOwnerName && Developers && startDate && methodology)

  const handleMethodologySelected = (e) => {
    setMethodology(e.target.value);
  };

  function handleAddNewProduct(){

    let data = {
      "productName" : productName,
      "scrumMasterName" : scrumMasterName,
      "productOwnerName" : productOwnerName,
      "Developers" : Developers,
      "startDate" : startDate,
      "methodology" : methodology
    }
    console.log(" current setup : ", data)

    fetch(`http://localhost:3000/api/add_product`, {
      mode:"cors", 
      method:"POST", 
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }    
    })
    .then((response) => response.json() )
    .then((data) => {
      console.log(data)
      setOpen(false)
      document.location.reload()//check syntax
    })
    .catch((error) => {
      console.log(error)
    });

    
  }

  return (
    <div>
      <Button sx={{color:'black', width:'300px', bgcolor:"lightblue", marginY:"15px"}} onClick={handleOpen}>
        Add New Product <AddCircleIcon fontSize='large'/>
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
                Add New Product
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
              <FormLabel>Scrum Master Name</FormLabel>
              <TextField 
                fullWidth
                value={scrumMasterName}
                onChange={(event) => setScrumMasterName(event.target.value)}
                variant="outlined" 
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Product Owner Name</FormLabel>
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

            {/* constrain choices, only agile and waterfall */}
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
              <Button fullwidth type="submit" variant="contained" sx={{marginTop:"50px"}} onClick={handleAddNewProduct}>Add Product</Button>
              :
              <Button disabled fullwidth type="submit" variant="contained" sx={{marginTop:"50px"}} onClick={handleAddNewProduct}>Add Product</Button>
              }
            </Grid>   
          </Grid>

        </Box>
      </Modal>
    </div>
  );
}

