import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './style.scss';
import GameButton from './GameButton';

class App extends React.Component {
    constructor(props) {
	super(props);
    }

    startGame() {
	console.log("started");
    }
    
    render() {
	return (
	    <div>
		<div className="container">
		    <div className="vert controls">
			<div className="title">Simon</div>
			<div className="row buttons">
			    <div className="vert counter">
				<div className="icon">--</div>
				<div className="label">COUNT</div>
			    </div>
			    
			    <div className="vert start">
				<div onClick={this.startGame}
				     className="icon"></div>
				<div className="label">START</div>
			    </div>

			    <div className="vert strict">
				<div className="indicator"></div>
				<div className="icon"></div>
				<div className="label">STRICT</div>
			    </div>
			</div>
			
			<div className="row switchOn">
			    <div className="label">OFF</div>
			    <div className="switch"></div>
			    <div className="label">ON</div>
			</div>
		    </div>
		    
		    <GameButton position="topLeft"></GameButton>
		    <GameButton position="topRight"></GameButton>
		    <GameButton position="bottomLeft"></GameButton>
		    <GameButton position="bottomRight"></GameButton>

		</div>
	    </div>
	);
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
    
