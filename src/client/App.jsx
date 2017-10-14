import React, { Component } from 'react';
import { inject, observer, observe } from 'mobx-react';
import { Route } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import Menu from './components/Menu';
import TopBar from './components/TopBar';
import Content from './components/Content';
import classnames from 'classnames/bind';

import styles from './App.css';

import Login from './components/Login';

const cx = classnames.bind(styles);
// import DevTools from 'mobx-react-devtools';

@inject('themeStore')
@inject('tokenStore')
@inject('routing')
@observer
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }

    this.checkToken();
    this.handleChange = this.handleChange.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  componentWillReact() {
    this.checkToken()
  }

  handleChange(event, index) {
      let { history } = this.props;

    if(index!==undefined && index!==Object(index)){
      history.push(index);
    }
  }

  render() {
    // const { location, push, goBack } = this.props.themeStore;
    const { darkTheme } = this.props.themeStore;

    return (
      <MuiThemeProvider muiTheme={darkTheme ? getMuiTheme(darkBaseTheme) : null}>

          <Route path="/" render={({location}) => {
              return this.state.loggedIn && location.pathname !== '/login' ? (
                    <div className={cx('clearfix')}>
                      <TopBar />
                      <Menu handleChange={this.handleChange} />
                      <Content />
                    </div>
              ) :

              (
                <Login />
              )
          }} />
      </MuiThemeProvider>

    );
  }

  checkToken() {
    return fetch("/auth", {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({token: localStorage.token})
    })
    .then(res => {
      res.json().then(json => {

        this.setState({loggedIn: json.access});

        if(json.redirectToLogin) {
          const { push, location } = this.props.routing;
          if(location.pathname !== '/login') push('/login');
        }

      })
    })
    .catch(err => {
        console.log(err);
        return false;
    })
   
  }
};

export default App;
