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
        
        const form = new FormData(document.getElementById('login-form'));
        const formIsFilled = form.get('login') && form.get('password');

        if(formIsFilled) {

            this.setState({loading: true});

            fetch("/login", {
              method: "POST",
              body: form
            })
            .then(() => {
                console.log('Processing logging');
                setTimeout(() => {
                    this.setState({loading: false});
                }, 2000)
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
