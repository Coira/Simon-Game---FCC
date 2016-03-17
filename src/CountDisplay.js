import React from 'react';
import classnames from 'classnames';

import './style.scss';

class CountDisplay extends React.Component {
    constructor(props) {
	super(props);
	this.state = {hidden: false};
    }

    flash() {
	let repeat = 0;

	let anim = setInterval(function() {
	    if (this.state.hidden) {
		this.setState({hidden: false});
		repeat++;
	    }
	    else if (!this.state.hidden) {
		this.setState({hidden: true});
	    }
	    if (repeat >= 2) {
		clearInterval(anim);
	    }
	}.bind(this), 300);
    }
    
    render() {
	return (<div className="vert counter">
	    <div className=
		 {classnames("dispIcon",
			     {hidden: this.state.hidden})}>
		{this.props.count === 0 ? "--" : this.props.count}</div>
	    <div className="label">COUNT</div>
	</div>);
	
    }

}

export default CountDisplay;    
