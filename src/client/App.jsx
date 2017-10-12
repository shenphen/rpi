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
@observer
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: !!props.token
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReact() {
    const { token } = this.props.tokenStore;
    if(!!token !== this.state.loggedIn) this.setState({loggedIn: !!token})
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

          <Route path="/" render={() => {
              return this.state.loggedIn ? (
                    <div className={cx('clearfix')}>
                      <TopBar />
                      <Menu handleChange={this.handleChange} />
                      <Content />
                    </div>
              ) :

              (
                <Login history={this.props.history}/>
              )
          }} />
      </MuiThemeProvider>

    );
  }

  onReset = () => {
    this.props.themeStore.resetTimer();
  }
};

export default App;
