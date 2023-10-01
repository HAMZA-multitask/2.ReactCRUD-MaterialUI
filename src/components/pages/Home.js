import React from 'react'
import { Typography, Box, makeStyles, Grid, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip, TextField, Button } from "@material-ui/core";
import { deepPurple, green, orange } from '@material-ui/core/colors'; 
import List from "../student/List"
import axios from 'axios';
import { useState } from 'react';

const useStyles = makeStyles ({
 headingColor:{
    backgroundColor: deepPurple[400],
    color: "white"
 },
 addStuColor:{
    backgroundColor: green[400],
    color: "white"
 },
 stuListColor:{
    backgroundColor: orange[400],
    color: "white"
 },
 tableHeadCell:{
    color: "white",
    fontWeight: "bold",
    fontSize: 16
 }
});

const Home = () => {
    const classes = useStyles();
    const [student, setStudent] = useState({
        stuname:"",
        email:""
    });
    const [status, setStatus] = useState();

    function onChangeTextField(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
        console.log(student)
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3333/students/', student);
            setStatus(true);
        } catch (error) {
            console.log("something is wrong3");
        }
    }

    if (status) {
        return <Home />
    }

  return (
    <>
        <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
            <Typography variant="h2">CRUD with API Call</Typography>
        </Box>

        <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
                    <Typography variant="h4">Add Student</Typography>
                </Box>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField  autoComplete='stuname' name='stuname' variant='outlined' required fullWidth
                            id='stuname' label='Name' onChange={e => onChangeTextField(e)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField  autoComplete='email' name='email' variant='outlined' required fullWidth
                            id='email' label='Email Address' onChange={e => onChangeTextField(e)}/>
                        </Grid>
                    </Grid>
                    <Box m={3}>
                        <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
                    </Box>
                </form>
            </Grid>
            <Grid item md={6} xs={12}>
                <List />
            </Grid>
        </Grid>
    </>
  )
}

export default Home