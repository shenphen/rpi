import React from 'react';
import AppBar from 'material-ui/AppBar';
import classnames from 'classnames/bind';

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Power from 'material-ui/svg-icons/action/power-settings-new';

import Timer from './Timer';

import styles from './TopBar.css';

const cx = classnames.bind(styles);

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