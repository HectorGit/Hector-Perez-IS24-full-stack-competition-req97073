import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

//state management : 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchDeleteProduct } from './../redux/productReducer';

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

export default function DeleteProductModal(props) {

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let currentProduct = props.product

  function handleDeleteProduct(){

    console.log("product_to_delete : ", currentProduct)

    dispatch(fetchDeleteProduct(currentProduct.productId)) //to write the new product
    dispatch(fetchProducts()) //to refresh what's shown on the page
    handleClose()
    
  }

  return (
    <div>
      <Button sx={{color:'black', width:'50px', bgcolor:"lightblue", marginY:"15px"}} onClick={handleOpen}>
        <DeleteIcon fontSize='large'/>
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
              <Typography variant="h3" sx={{color:"black"}}>
                Delete Product {currentProduct.productId} ? 
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h3" sx={{justifyContent:"center"}}>
                <WarningIcon fontSize='large'/>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                Product Name : {currentProduct.productName}
              </Typography>
              <Typography>
                Scrum Master Name : {currentProduct.scrumMasterName}
              </Typography>
              <Typography>
                Product Owner Name : {currentProduct.productOwnerName}
              </Typography>

              <>
                <Typography>
                  Developers : 
                </Typography>
                <List dense={true}>
                  {currentProduct.Developers.map((developer_name) => {
                    return(
                      <ListItem key={developer_name}>
                        <ListItemText
                          primary={developer_name}
                        />
                      </ListItem>
                    )})
                  }
                </List>
              </>


              <Typography>
                startDate : {currentProduct.startDate}
              </Typography>
              <Typography>
                methodology : {currentProduct.methodology}
              </Typography>
            </Grid>

            <Grid item xs={12} justifyContent="center" display="flex">
              <Button type="submit" variant="contained" sx={{marginTop:"50px"}} onClick={handleDeleteProduct}>Delete Product</Button>
            </Grid>   

          </Grid>

        </Box>
      </Modal>
    </div>
  );
}

