import React from 'react';
import { inject, observer } from "mobx-react";

import Paper from 'material-ui/Paper';

import muiThemeable from 'material-ui/styles/muiThemeable';

import styles from './Content.css'
import { Route, Switch } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const State = () => (
  <div>
    <h2>State</h2>
  </div>
)

const Statistics = () => (
  <div>
    <h2>Statistics</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

@inject('themeStore')
@observer class Content extends React.Component {
  
  render () {
    return (
      <Paper className={styles.root}>
        <Switch>
          <Route exact path="/state" component={State}/>  
          <Route path="/about" component={About}/>
          <Route path="/statistics" component={Statistics}/>
          <Route path="*" component={Home}/>
        </Switch>
      </Paper>
    );
  }
}


export default muiThemeable()(Content);