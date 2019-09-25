import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { mainListItems, secondaryListItems } from './listItems';
import Modal from './Modal';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex'
   },
   toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
   },
   toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
   },
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen
      })
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   },
   menuButton: {
      marginRight: 36
   },
   menuButtonHidden: {
      display: 'none'
   },
   title: {
      flexGrow: 1
   },
   drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   },
   drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
         width: theme.spacing(9)
      }
   },
   appBarSpacer: theme.mixins.toolbar,
   content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto'
   },
   container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
   },
   paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
   },
   fixedHeight: {
      height: 240
   }
}));

//Employee table styles
const StyledTableCell = withStyles(theme => ({
   head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
   },
   body: {
      fontSize: 14
   }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
   root: {
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.background.default
      }
   }
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
   return { name, calories, fat, carbs, protein };
}

const rows = [
   createData(
      'John Snow',
      'King in the North',
      80000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   ),
   createData(
      'Arya Stark',
      'Faceless Woman',
      75000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   ),
   createData(
      'Daenerys Targaryen',
      'The Mad Queen',
      90000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   ),
   createData(
      'Sansa Stark',
      'Queen of WinterFell',
      65000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   ),
   createData(
      'Sandor Clegane',
      'The Hound',
      55000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   )
];

const useStylesTable = makeStyles(theme => ({
   root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
   },
   table: {
      minWidth: 700
   }
}));

export default function Dashboard() {
   const classes = useStyles();
   const [open, setOpen] = React.useState(true);
   const handleDrawerOpen = () => {
      setOpen(true);
   };
   const handleDrawerClose = () => {
      setOpen(false);
   };
   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

   const tableClasses = useStylesTable();

   return (
      <div className={classes.root}>
         <CssBaseline />
         <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
         >
            <Toolbar className={classes.toolbar}>
               <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                     classes.menuButton,
                     open && classes.menuButtonHidden
                  )}
               >
                  <MenuIcon />
               </IconButton>
               <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
               >
                  Elder Tree Dashboard
               </Typography>
            </Toolbar>
         </AppBar>
         <Drawer
            variant="permanent"
            classes={{
               paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
               )
            }}
            open={open}
         >
            <div className={classes.toolbarIcon}>
               <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
               </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
         </Drawer>
         <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
               <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                     <Paper>
                        {/* Employee table */}
                        <Box my={2}>
                           <Paper className={classes.root}>
                              <Table className={classes.table}>
                                 <TableHead>
                                    <TableRow>
                                       <StyledTableCell>
                                          Employee Name
                                       </StyledTableCell>
                                       <StyledTableCell align="right">
                                          Job Title
                                       </StyledTableCell>
                                       <StyledTableCell align="right">
                                          Salary
                                       </StyledTableCell>
                                       <StyledTableCell align="right">
                                          Edit/Delete
                                       </StyledTableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {rows.map(row => (
                                       <StyledTableRow key={row.name}>
                                          <StyledTableCell
                                             component="th"
                                             scope="row"
                                          >
                                             {row.name}
                                          </StyledTableCell>
                                          <StyledTableCell align="right">
                                             {row.calories}
                                          </StyledTableCell>
                                          <StyledTableCell align="right">
                                             {row.fat}
                                          </StyledTableCell>
                                          <StyledTableCell align="right">
                                             {row.carbs}
                                          </StyledTableCell>
                                       </StyledTableRow>
                                    ))}
                                 </TableBody>
                              </Table>
                           </Paper>
                        </Box>
                     </Paper>
                  </Grid>
               </Grid>
            </Container>
         </main>
      </div>
   );
}
