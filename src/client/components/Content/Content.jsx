import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject, observer } from "mobx-react";

import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

import styles from './Content.css'

import Charts from '../Charts';
import State from '../State';

const Home = () => (
  <div>
    <h2>Home</h2>
    <div>
      <strong>Temperatura i wilgotość</strong>
      <hr />
      <Charts/>
    </div>
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

const NotFound = () => (
  <div>
    <h2>NotFound</h2>
  </div>
)

@inject('themeStore')
@observer class Content extends React.Component {
  
  render () {
    return (
      <Paper className={styles.root}>
        <Switch>
          <Route exact path="/state" compongit difent={State}/>
          <Route path="/about" component={About}/>
          <Route path="/statistics" component={Statistics}/>
          <Route path="/dashboard" component={Home}/>
          <Route path="/*" component={NotFound}/>
        </Switch>
      </Paper>
    );
  }
}


export default muiThemeable()(Content);