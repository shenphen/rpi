import React from 'react';
import { inject, observer } from "mobx-react";

import { SelectableMenuList } from 'material-ui-selectable-menu-list';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Paper from 'material-ui/Paper';
import Home from 'material-ui/svg-icons/action/home';
import Storage from 'material-ui/svg-icons/device/storage';
import Equalizer from 'material-ui/svg-icons/av/equalizer';
import Mode from 'material-ui/svg-icons/action/chrome-reader-mode';
import Night from 'material-ui/svg-icons/image/brightness-2';
import Sun from 'material-ui/svg-icons/image/wb-sunny';

import Settings from 'material-ui/svg-icons/action/settings';
import Language from 'material-ui/svg-icons/action/language';

import styles from './Menu.css'

@inject('themeStore')
@observer class SideMenu extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      darkTheme: props.themeStore.darkTheme,
      menuItems: [
        {
          value:'/dashboard',
          primaryText: 'Start',
          leftIcon: <Home />
        },
        {
          value:'/state',
          primaryText: 'Stan',
          leftIcon: <Storage />
        },
        {
          value:'/statistics',
          primaryText: 'Statystyki',
          leftIcon: <Equalizer />
        },
        {
          primaryText: 'Ustawienia',
          leftIcon: <Settings />,
          primaryTogglesNestedList: true,
          nestedItems:[
            {
              primaryText: 'Język',
              primaryTogglesNestedList: true,
              leftIcon: <Language />,
            },
            {
              primaryText: 'Tryb ekranu',
              primaryTogglesNestedList: true,
              leftIcon: <Mode />,
              nestedItems:[
                {
                  primaryText: 'Dzienny',
                  primaryTogglesNestedList: true,
                  leftIcon: <Sun />,
                  onClick: () => this.props.themeStore.darkTheme = false
                },
                {
                  primaryText: 'Nocny',
                  leftIcon: <Night />,
                  onClick: () => this.props.themeStore.darkTheme = true
                }
              ]
            }
          ]
        },
      ]
    }
  }
  onChange(event) {
    this.props.themeStore.changeTheme();
    
  }

  render () {
    const { match, handleChange} = this.props;
    return (
      <div className={styles.root}>
        <Paper className={styles.paper} zDepth={2}>

          <SelectableMenuList
            items={this.state.menuItems}
            index={match ? match.path : '/'}
            onIndexChange={handleChange}
          />
          
        </Paper>
      </div>
    );
  }
}


export default muiThemeable()(SideMenu);