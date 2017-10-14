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

const RevealMenu = (props) => (
  <div>
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton style={{color: '#fff'}}><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem onClick={props.onLogoutClick} primaryText="Wyloguj" rightIcon={<Power />} />
    </IconMenu>
  </div>
);
RevealMenu.muiName = 'IconMenu';

@inject('tokenStore')
@inject('routing')
@observer
class AppBarContainer extends React.Component {
  render() {
    return (
    <AppBar
        title="Admin Panel"
        className={cx('root')}
        
        iconElementRight={ <RevealMenu onLogoutClick={this.onLogout.bind(this)}/> }
      />

    )
  }

  onLogout() {
    this.props.tokenStore.onLogout();
    this.props.routing.push('/login');
  }
}

export default AppBarContainer;