import React from 'react';
import classnames from 'classnames';

import './style.scss';

class GameButton extends React.Component {
    constructor(props) {
	super(props);
    }
    render() {
	return (
	    <div className={classnames("gameBtn", this.props.position)}></div>
	);
    }
    
}

export default GameButton;
