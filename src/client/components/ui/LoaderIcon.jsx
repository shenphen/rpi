import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

export default (props) => {

    const { size = 24 } = props;
    const style = {width: size, height: size, ...props.style};

    return(
        <SvgIcon {...props} viewBox="0 0 128 128" style={style}>
           <g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill="#000000" fillOpacity="1"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="800ms" repeatCount="indefinite"></animateTransform></g>
        </SvgIcon>
    )
};