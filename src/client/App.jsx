import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';

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
@observer
class App extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
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

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" children={({match}) => (
            <div className={cx('clearfix')}>
              <TopBar />
              <Menu handleChange={this.handleChange} />
              <Content />
              
              {/*<span>Current pathname: {location.pathname}</span>
              <button onClick={() => push('/test')}>Change url</button>
              <button onClick={() => goBack()}>Go Back</button>*/}
              {/* <DevTools /> */}
            </div>

          )} />
        </Switch>
      </MuiThemeProvider>

    );
  }

  onReset = () => {
    this.props.themeStore.resetTimer();
  }
};

export default App;
