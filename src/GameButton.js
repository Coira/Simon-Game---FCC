import React from 'react';
import classnames from 'classnames';

import './style.scss';

class GameButton extends React.Component {
    constructor(props) {
	super(props);
	this.state = {lit: false};
	this.anim = null;
	this.animStart = null;
    }

    highlight() {
	this.setState({lit:true});
    }

    unhighlight() {
	this.setState({lit:false});
    }

	
    render() {
	let cn = this.props.position;
	let cnLit = cn+"Highlight";

	return (<div className=
		     {classnames("gameBtn",
				 cn,
				 {[cnLit]: this.state.lit},
				 {"disableClicks":this.props.disableClicks})}
		     onClick={this.props.clicked}>
	    </div>
	);
    }
    
}

export default GameButton;
