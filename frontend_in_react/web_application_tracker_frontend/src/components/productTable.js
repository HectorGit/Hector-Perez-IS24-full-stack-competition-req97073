import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import EditProductModal from './editProductModal';
import DeleteProductModal from './deleteProductModal';

export default function ProductTable(props) {

  let products = props.products

  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth:650}} aria-label="products-table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Product Number</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Scrum Master</TableCell>
            <TableCell align="center">Product Owner</TableCell>
            <TableCell align="center">Developer Names</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Methodology</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && products.map((product) => (
            <TableRow
              key={product.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component="th" scope="row">
                {product.productId}
              </TableCell>
              <TableCell align="center">{product.productName}</TableCell>
              <TableCell align="center">{product.scrumMasterName}</TableCell>
              <TableCell align="center">{product.productOwnerName}</TableCell>
              <TableCell align="center">
                <Stack>
                    {product.Developers.map((developer_name) => {
                        return(
                            <Typography key={developer_name}>
                                {developer_name}
                            </Typography>
                        )})
                    }
                </Stack>
              </TableCell>
              <TableCell align="center">{product.startDate}</TableCell>
              <TableCell align="center">{product.methodology}</TableCell>
              <TableCell align="center">
                <EditProductModal product={product}/>
              </TableCell>
              <TableCell align="center">
                <DeleteProductModal product={product}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}