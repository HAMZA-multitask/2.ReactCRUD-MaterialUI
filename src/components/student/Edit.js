import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core";
import { deepPurple, green, orange } from '@material-ui/core/colors'; 
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

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

const Edit = () => {
    const classes = useStyles();
    const id = useParams();
    const history = useNavigate();
    const [student, setStudent] = useState({
        stuname: "",
        email: ""
    });
    useEffect(() => {
        async function getStudent() {
            try {
                const student = await axios.get("http://localhost:3333/students/${id}");
                // console.log(students.data);
                setStudent(student.data)
            } catch (error) {
                console.log("something is wrong4");
            }
        }
        getStudent();
    }, [])

    async function onFormSubmit(e) {
        e.preventDefault();
        try {
            await axios.put('http://localhost:3333/students/${id}', student);
            history("/");
        } catch (error) {
            console.log("something is wrong3");
        }
    }

    function onChangeTextField(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
        console.log(student)
    }

    function handleBackButton() {
        history("/");
    }

  return (
    <>
        <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
            <Typography variant="h2">CRUD with API Call</Typography>
        </Box>

        <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
                    <Typography variant="h4">Edit Student</Typography>
                </Box>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField  autoComplete='id' name='id' variant='outlined' required fullWidth
                            id='id' label='ID' autofocus value={id}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField  autoComplete='stuname' name='stuname' variant='outlined' required fullWidth
                            id='stuname' label='Name' autofocus value={student.stuname} onChange={e => onChangeTextField(e)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField  autoComplete='email' name='email' variant='outlined' required fullWidth
                            id='email' label='Email Address' value={student.email} onChange={e => onChangeTextField(e)}/>
                        </Grid>
                    </Grid>
                    <Box m={3}>
                        <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Update</Button>
                    </Box>
                </form>
                <Box m={3} textAlign="center">
                    <Button variant="contained" color="primary" onClick={handleBackButton}>Back to Home</Button>
                </Box>
            </Grid>
        </Grid>
    </>
  )
}

export default Edit