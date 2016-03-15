import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './style.scss';
import GameButton from './GameButton';

class App extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    disableClicks: true,
	    switchedOn: true
	};
	this.sequenceCount = 0;
	this.sequence = [];
	this.anim = null;
	this.pIndex = 0;
    }

    turnOnGame() {
	// click handler for switch button
    }
    
    startGame() {
	// click handler for start button

	if (this.state.switchedOn) {
	    this.sequenceCount = 0;
	    this.sequence = [];
	    this.compTurn();
	}
    }

    compTurn() {
	console.log("comp turn");

	this.createSequence();
	this.displaySequence();
	this.playerTurn();
    }

    playerTurn() {

	this.pIndex = 0;
	// now wait for player to enter sequence
    }
    
    createSequence() {
	this.sequenceCount++;
	this.sequence.push(Math.floor(Math.random() * 4));
	//this.sequence.push(0);
    }

    displaySequence() {
	console.log(this.sequence);

	if (this.anim === null && this.sequence.length > 0) {
	    let animStart = 0;
	    let index = 0;
	    let ref = this.sequence[index];
	    this.setState({disableClicks: true});

	    this.anim = setInterval(function() {
		animStart += 100;
		if (animStart === 500) {
		    this.refs[ref].highlight();
		}
		else if (animStart >= 1100) {
		    this.refs[ref].unhighlight();
		    index++;
		    ref = this.sequence[index];
		    if (index < this.sequence.length) {
			animStart = 0;
		    }
		    else {
			clearInterval(this.anim);
			this.anim = null;
			this.setState({disableClicks: false});
		    }
		}
	    }.bind(this), 100);
	}
    }

    
    gameBtnClicked(ref) {
	console.log(ref);
	if (ref === this.sequence[this.pIndex]) {
	    console.log("correct");
	}
	else {
	    console.log("incorrect");
	}

	this.pIndex++;
	if (this.pIndex === this.sequence.length) {
	    this.compTurn();
	}
	
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
				<div onClick={this.startGame.bind(this)}
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
		    
		    <GameButton position="topLeft"
				disableClicks={this.state.disableClicks}
				clicked={this.gameBtnClicked.bind(this, 0)}
				ref="0"></GameButton>
		    <GameButton position="topRight"
				disableClicks={this.state.disableClicks}
				clicked={this.gameBtnClicked.bind(this, 1)}
				ref="1"></GameButton>
		    <GameButton position="bottomLeft"
				disableClicks={this.state.disableClicks}
				clicked={this.gameBtnClicked.bind(this, 2)}
				ref="2"></GameButton>
		    <GameButton position="bottomRight"
				disableClicks={this.state.disableClicks}
				clicked={this.gameBtnClicked.bind(this, 3)}
				ref="3"></GameButton>

		</div>
	    </div>
	);
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
    
