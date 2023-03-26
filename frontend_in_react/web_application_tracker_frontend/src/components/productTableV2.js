import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

export default function ProductTableV2(props) {

  let products = props.products

  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="products-table">
        <TableHead>
          <TableRow>
            <TableCell>Product Number</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Scrum Master</TableCell>
            <TableCell align="right">Product Owner</TableCell>
            <TableCell align="right">Developer Names</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">Methodology</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && products.map((product) => (
            <TableRow
              key={product.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.productId}
              </TableCell>
              <TableCell align="right">{product.productName}</TableCell>
              <TableCell align="right">{product.scrumMasterName}</TableCell>
              <TableCell align="right">{product.productOwnerName}</TableCell>
              <TableCell align="right">
                <Stack>
                    {product.Developers.map((developer_name) => {
                        return(
                            <Typography>
                                {developer_name}
                            </Typography>
                        )})
                    }
                </Stack>
              </TableCell>
              <TableCell align="right">{product.startDate}</TableCell>
              <TableCell align="right">{product.methodology}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}