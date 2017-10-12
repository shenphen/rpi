import React from 'react';
import AppBar from 'material-ui/AppBar';
import classnames from 'classnames/bind';
import { inject, observer } from "mobx-react";

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Power from 'material-ui/svg-icons/action/power-settings-new';

import styles from './TopBar.css';

const cx = classnames.bind(styles);

@inject('tokenStore')
@observer class Timer extends React.Component{
  render() {
    const { secondsLeft } = this.props.tokenStore;
    const minutes = Math.floor(secondsLeft/60);
    const seconds = secondsLeft%60 < 10 ? '0'+secondsLeft%60 : secondsLeft%60;
    return (
      <div>
        {`${minutes}:${seconds}`}
      </div>
    )
  }
}

const RevealMenu = (props) => (
  <div>
    <Timer />
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton style={{color: '#fff'}}><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Sign out" rightIcon={<Power />} />
    </IconMenu>
  </div>
);
RevealMenu.muiName = 'IconMenu';

const AppBarContainer = () => (
  <AppBar
    title="Admin Panel"
    className={cx('root')}
    
    iconElementRight={ <RevealMenu /> }
  />
);

export default AppBarContainer;
/**
* A simple example of `AppBar` with an icon on the right.
* By default, the left icon is a navigation-menu.
*/