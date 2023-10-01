import { Typography, Box, makeStyles, Grid, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip, TextField, Button } from "@material-ui/core";
import { orange } from '@material-ui/core/colors'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from "react";

const useStyles = makeStyles ({
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

const View = () => {
    const classes = useStyles();
    const { id } = useParams();
    // console.log(id);
    const [student, setStudent] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        async function getStudent() {
            try {
                const student = await axios.get("http://localhost:3333/students/${id}");
                // console.log(students.data);
                setStudent(student.data)
            } catch (error) {
                console.log("something is wrong1");
            }
        }
        getStudent();
    }, [])

    

    function handleBackButton() {
        history("/");
    }
  return (
    <>
        <Box textAlign="center" p={2} className={classes.stuListColor}>
            <Typography variant="h4">Student Detail</Typography>
        </Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow style={{ backgroundColor: "#616161" }}>
                        <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
                        <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                        <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{student.id}</TableCell>
                        <TableCell align="center">{student.stuname}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Box textAlign="center" m={3}>
            <Button variant="contained" color="primary" onClick={handleBackButton}>Back to Home</Button>
        </Box>
    </>
  )
}

export default View