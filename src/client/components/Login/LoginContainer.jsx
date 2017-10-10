import React, { Component } from 'react';

import Login from './Login';

// const required = 'Pole wymagane.';
// const incorrectData = 'Nieprawidłowy login i/lub hasło.';

class LoginContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {
                login: '',
                password: '',
                header: ''
            },
            loading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return(
            <Login {...this.state} onChange={this.onChange} onSubmit={this.onSubmit} />
        )
    }

    onChange(name) {
        
        if(Object.keys(this.state.errors).indexOf(name) !== -1) {
            let newState = {...this.state};
            newState.errors[name] = '';

            this.setState(newState);
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const self = this;
        
        const form = new FormData(document.getElementById('login-form')),
              login = form.get('login'),
              password = form.get('password');

        const formIsFilled = login && password;

        if(formIsFilled) {

            const data = { login, password };

            this.setState({loading: true});
            
            fetch("/login", {
              method: "POST",
              headers: new Headers({"Content-Type": "application/json"}),
              body: JSON.stringify(data)
            })
            .then(res => {
                res.json().then((result) => {
                    let newState = {loading: false};
                    newState.errors = {...self.state.errors};

                    if(result && result.error) {
                        newState.errors.header = result.error;
                    }
                    else if(result.access) {
                        newState.errors.header = '';
                    }

                    this.setState(newState);
                })
            })
            .catch(err => {
                console.log(err);
            });
        }
        else {
            let { errors } = this.state;

            if(!form.get('login')) errors.login = 'Wprowadź login';
            if(!form.get('password')) errors.password = 'Wprowadź hasło';

            this.setState({errors});
        }
    }
}

export default LoginContainer;

