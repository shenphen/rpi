import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './Login.css';

import LoaderIcon from '../ui/LoaderIcon';

const Login = ({errors, onChange, onSubmit, loading}) => {

    return (
        <div className={styles.root}>
            <Redirect to='/login'/>

            <Paper className={styles.paper}>
                <form action="/" className={styles.form} id="login-form" onSubmit={onSubmit} encType="multipart/form-data">
                    {errors.header && <span className={styles.error}>{errors.header}</span>}
                    <TextField type="text" name="login"
                        className={styles.input}
                        hintText="Login" 
                        errorText={errors.login}
                        onChange={(e) => {onChange(e.target.name)} } />
                    <br/>
                    <TextField type="password" name="password"
                        className={styles.input}
                        hintText="Hasło" 
                        errorText={errors.password}
                        onChange={(e) => {onChange(e.target.name)}} />
                    <br/>
                    {loading ?
                    <RaisedButton className={styles.button} label="Zaloguj" icon={<LoaderIcon style={{position: 'absolute', left: 24, top: 6}} />} labelStyle={{paddingLeft: 16}} primary={true} disabled={true} /> 
                    : <RaisedButton className={styles.button} label="Zaloguj" primary={true} type="submit" />}
                </form>
            </Paper>
        </div>
    )
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default Login;
