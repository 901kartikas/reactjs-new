import React, { useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./UseForm";
import { connect } from "react-redux";
import * as actions from "../actions/employee";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    EmployeeName:'',
    Departement:'',
    Email:'',
    DOJ:'',

}

const EmployeeForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('EmployeeName' in fieldValues)
            temp.EmployeeName = fieldValues.EmployeeName ? "" : "This field is required."
        if ('Departement' in fieldValues)
            temp.Departement = fieldValues.Departement ? "" : "This field is required."
        if ('Email' in fieldValues)
            temp.Email = (/^$|.+@.+..+/).test(fieldValues.Email) ? "" : "Email is not valid."
        if ('DOJ' in fieldValues)
            temp.DOJ = fieldValues.DOJ ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createEmployee(values, onSuccess)
            else
                props.updateEmployee(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.employeeList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="EmployeeName"
                        variant="outlined"
                        label="Name"
                        value={values.EmployeeName}
                        onChange={handleInputChange}
                        {...(errors.EmployeeName && { error: true, helperText: errors.EmployeeName })}
                    />
                    <TextField
                        name="Email"
                        variant="outlined"
                        label="Email"
                        value={values.Email}
                        onChange={handleInputChange}
                        {...(errors.Email && { error: true, helperText: errors.Email })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.Departement && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Departement</InputLabel>
                        <Select
                            name="Departement"
                            value={values.Departement}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Departement</MenuItem>
                            <MenuItem value="DAD">DAD</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                        </Select>
                        {errors.Departement && <FormHelperText>{errors.Departement}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        name="DOJ"
                        type="date"
                        variant="outlined"
                        value={values.DOJ}
                        label="Date On Job"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    employeeList: state.employee.list
})

const mapActionToProps = {
    createEmployee: actions.create,
    updateEmployee: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EmployeeForm));

















