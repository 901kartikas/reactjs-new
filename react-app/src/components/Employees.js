import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/employee";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import EmployeeForm from "./EmployeeForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Employees = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllEmployees()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteEmployee(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <EmployeeForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Employee Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Departement</TableCell>
                                    <TableCell>Date On Job</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.employeeList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.employeeName}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>{record.departement}</TableCell>
                                            <TableCell>{record.doj}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    employeeList: state.employee.list
})

const mapActionToProps = {
    fetchAllEmployees: actions.fetchAll,
    deleteEmployee: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Employees));