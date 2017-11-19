
import React from 'react';
import { inject, observer } from "mobx-react";
import muiThemeable from 'material-ui/styles/muiThemeable';

import Refresh from 'material-ui/svg-icons/notification/sync';

@inject('tokenStore')
@inject('routing')
@observer class Timer extends React.Component{
  render() {
    const { secondsLeft } = this.props.tokenStore;
    const minutes = Math.floor(secondsLeft/60);
    const seconds = secondsLeft%60 < 10 ? '0'+secondsLeft%60 : secondsLeft%60;
    const color = secondsLeft > 60 ? this.props.muiTheme.appBar.textColor : '#ff0207';
    if(secondsLeft < 1) this.props.routing.push('/login');
    return (
      <div style={{display: 'inline-block',
                   position: 'relative',
                   color,
                   top: -5,
                   }}>
        {secondsLeft < 120 && <Refresh style={{marginBottom: -6, marginRight: 5, color: 'inherit', cursor: 'pointer'}} onClick={this.props.tokenStore.refreshTimer}/>}
        {`${minutes}:${seconds}`}
      </div>
    )
  }
}

export default muiThemeable()(Timer);