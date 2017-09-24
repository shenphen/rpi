import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './App.css';
import logo from './logo.svg';

@inject('routing')
@observer
export default class App extends Component {
  render() {
    const { location, push, goBack } = this.props.routing;

    return (
      <div>
        <span>Current pathname: {location.pathname}</span>
        <button onClick={() => push('/test')}>Change url</button>
        <button onClick={() => goBack()}>Go Back</button>
        <div className={styles.App}>
            <div className={styles.header}>
            <img src={logo} className={styles.logo} alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className={styles.intro}>
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>  
      </div>
    );
  }
}