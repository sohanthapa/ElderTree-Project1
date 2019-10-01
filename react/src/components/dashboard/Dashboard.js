/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
   CssBaseline,
   Drawer,
   AppBar,
   Toolbar,
   List,
   Typography,
   Divider,
   IconButton,
   Container,
   Grid,
   Paper,
   Button,
   Box
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddIcon from '@material-ui/icons/Add';
import { mainListItems } from './listItems';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import EmployeeTable from './EmployeeTable';
import EmployeeService from '../../services/EmployeeService';

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

export default function Dashboard() {
   const classes = useStyles();
   const [drawerIsOpen, setDrawerOpen] = useState(true);
   const [addModalIsVisible, setAddModalVisible] = useState(false);
   const [editModalIsVisible, setEditModalVisible] = useState(false);
   const [employees, setEmployees] = useState([]);
   const [Employee, setEmployee] = useState({
      FirstName: '',
      LastName: '',
      DOB: '',
      Salary: '',
      Title: '',
      Gender: ''
   });

   useEffect(() => {
      async function fetchData() {
         EmployeeService.SelectAll(
            onSelectAllEmployeesSuccess,
            onSelectAllEmployeesError
         );
      }
      fetchData();
   }, []);

   const toggleDrawerState = () => {
      if (drawerIsOpen) {
         setDrawerOpen(false);
      } else {
         setDrawerOpen(true);
      }
   };

   const toggleAddModalVisibility = event => {
      if (addModalIsVisible) {
         setAddModalVisible(false);
      } else {
         setAddModalVisible(true);
      }
      if (event.target.innerText === 'CANCEL') setEmployee(emptyObject);
   };
   const toggleEditModalVisibility = event => {
      if (editModalIsVisible) {
         setEditModalVisible(false);
      } else {
         setEditModalVisible(true);
      }
      if (event.target.innerText === 'CANCEL') setEmployee(emptyObject);
   };

   const emptyObject = obj => {
      return {
         FirstName: '',
         LastName: '',
         DOB: '',
         Salary: '',
         Title: '',
         Gender: ''
      };
   };

   const handleInputChange = event => {
      switch (event.target.id) {
         case 'firstName':
            setEmployee({ ...Employee, FirstName: event.target.value });
            break;
         case 'lastName':
            setEmployee({ ...Employee, LastName: event.target.value });
            break;
         case 'birthDate':
            setEmployee({ ...Employee, DOB: event.target.value });
            break;
         case 'salary':
            setEmployee({ ...Employee, Salary: event.target.value });
            break;
         case 'jobTitle':
            setEmployee({ ...Employee, Title: event.target.value });
            break;
         case 'gender':
            setEmployee({ ...Employee, Gender: event.target.value });
            break;
         default:
            break;
      }
   };

   const onSelectAllEmployeesSuccess = response => {
      console.log('employees', response.data);
      const data = response.data.map(concatinateName);
      setEmployees(data);
   };

   const onSelectAllEmployeesError = error => {
      console.log('Error', error.response);
   };

   const concatinateName = employee => {
      // eslint-disable-next-line no-param-reassign
      employee.Employee = employee.FirstName.concat(' ', employee.LastName);
      return employee;
   };

   const onEmployeeSubmitSuccess = response => {
      EmployeeService.SelectAll(
         onSelectAllEmployeesSuccess,
         onSelectAllEmployeesError
      );
      emptyObject(Employee);
   };

   const onEmployeeSubmitError = error => {
      console.log('submit error', error);
   };

   const handleNewEmployeeSubmission = event => {
      console.log('employee data', Employee);
      EmployeeService.Insert(
         Employee,
         onEmployeeSubmitSuccess,
         onEmployeeSubmitError
      );
      toggleAddModalVisibility(event);
      setEmployee(emptyObject);
   };

   const handleEditEmployeeSubmission = event => {
      console.log(Employee);
      EmployeeService.Update(
         Employee.Id,
         Employee,
         onEmployeeSubmitSuccess,
         onEmployeeSubmitError
      );

      toggleEditModalVisibility(event);
      setEmployee(emptyObject);
   };
   return (
      <div className={classes.root}>
         <CssBaseline />
         <AppBar
            position="absolute"
            className={clsx(
               classes.appBar,
               drawerIsOpen && classes.appBarShift
            )}
         >
            <Toolbar className={classes.toolbar}>
               <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawerState}
                  className={clsx(
                     classes.menuButton,
                     drawerIsOpen && classes.menuButtonHidden
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
                  !drawerIsOpen && classes.drawerPaperClose
               )
            }}
            open={drawerIsOpen}
         >
            <div className={classes.toolbarIcon}>
               <IconButton onClick={toggleDrawerState}>
                  <ChevronLeftIcon />
               </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
         </Drawer>
         <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
               {/* ADD BUTTON */}
               <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={toggleAddModalVisibility}
               >
                  <AddIcon className={classes.iconSmall} />
                  Add Employee
               </Button>

               <AddModal
                  modalState={addModalIsVisible}
                  handleClose={toggleAddModalVisibility}
                  handleSubmit={handleNewEmployeeSubmission}
                  handleChange={handleInputChange}
                  employee={Employee}
               />

               <UpdateModal
                  modalState={editModalIsVisible}
                  handleClose={toggleEditModalVisibility}
                  handleSubmit={handleEditEmployeeSubmission}
                  handleChange={handleInputChange}
                  employee={Employee}
               />

               <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                     <Paper>
                        {/* Employee table */}
                        <Box my={2}>
                           <EmployeeTable
                              toggleModalVisibility={toggleEditModalVisibility}
                              setEmployees={setEmployees}
                              setEmployee={setEmployee}
                              employees={employees}
                           />
                        </Box>
                     </Paper>
                  </Grid>
               </Grid>
            </Container>
         </main>
      </div>
   );
}
