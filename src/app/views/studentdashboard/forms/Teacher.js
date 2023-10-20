import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import FormDialog3 from 'app/views/material-kit/dialog/FormDialog3';
import useFetch from 'hooks/useFetch';
import { useState, Fragment } from 'react';
const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const subscribarList = [
  {
    name: 'john doe',
    date: '18 january, 2019',
    amount: 1000,
    status: 'close',
    company: 'ABC Fintech LTD.',
  },
  {
    name: 'kessy bryan',
    date: '10 january, 2019',
    amount: 9000,
    status: 'open',
    company: 'My Fintech LTD.',
  },
  {
    name: 'kessy bryan',
    date: '10 january, 2019',
    amount: 9000,
    status: 'open',
    company: 'My Fintech LTD.',
  },
  {
    name: 'james cassegne',
    date: '8 january, 2019',
    amount: 5000,
    status: 'close',
    company: 'Collboy Tech LTD.',
  },
  {
    name: 'lucy brown',
    date: '1 january, 2019',
    amount: 89000,
    status: 'open',
    company: 'ABC Fintech LTD.',
  },
  {
    name: 'lucy brown',
    date: '1 january, 2019',
    amount: 89000,
    status: 'open',
    company: 'ABC Fintech LTD.',
  },
  {
    name: 'lucy brown',
    date: '1 january, 2019',
    amount: 89000,
    status: 'open',
    company: 'ABC Fintech LTD.',
  },
  {
    name: 'lucy brown',
    date: '1 january, 2019',
    amount: 89000,
    status: 'open',
    company: 'ABC Fintech LTD.',
  },
  {
    name: 'lucy brown',
    date: '1 january, 2019',
    amount: 89000,
    status: 'open',
    company: 'ABC Fintech LTD.',
  },
];

const Teacher = () => {
  const { data, loading, error } = useFetch('/te/getusers');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Teachers' }]}
        />
        <FormDialog3 />
      </Box>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="left">Photo</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="left">{item.username}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.phone}</TableCell>

                    <TableCell align="right">
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={data.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          />
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default Teacher;
