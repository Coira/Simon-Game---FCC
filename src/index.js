import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './style.scss';
import GameButton from './GameButton';
import CountDisplay from './CountDisplay';

class App extends React.Component {
    constructor(props) {
	super(props);

	this.sequence = [];
	this.anim = null;
	this.pIndex = 0;
	
	this.state = {
	    disableClicks: true,
	    switchedOn: true,
	    sequenceCount: 0
	};

	this.startGame = this.startGame.bind(this);
    }

    turnOnGame() {
	// click handler for switch button
    }
    
    startGame() {
	// click handler for start button

	if (this.state.switchedOn) {
	    if (this.anim !== null) {
		for (var i = 0; i < 4; i++) {
		    this.refs[i].unhighlight();
		}
		
		clearInterval(this.anim);
		this.anim = null;
	    }
	    this.pIndex = 0;
	    this.sequence = [];
	    this.setState({sequenceCount: 0},
			  function() {
			      flashCounter(this.compTurn);
			  });
	}
    }

    flashCounter(callback) {
	this.refs["disp"].flash();
	setTimeout(this.callback.bind(this), 1800);
    }
    
    compTurn() {
	this.createSequence();
	this.displaySequence();
	this.playerTurn();
    }

    playerTurn() {

	this.pIndex = 0;
	// now wait for player to enter sequence
    }
    
    createSequence() {
	this.sequence.push(Math.floor(Math.random() * 4));
	this.setState({sequenceCount: this.state.sequenceCount+1});
	console.log(this.sequence);
    }

    displaySequence() {
//	console.log(this.state.sequenceCount);

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
	if (ref === this.sequence[this.pIndex]) {
	    // player enters correct button
	    this.pIndex++;
	    if (this.pIndex === this.sequence.length) {
		this.compTurn();
	    }
	}
	else {
	    // player enters incorrect button
	    this.pIndex = 0;
	    this.displaySequence();
	}

	
    }
    
    

    render() {
	return (
	    <div>
		<div className="container">
		    <div className="vert controls">
			<div className="title">Simon</div>
			<div className="row buttons">
			    
			    <CountDisplay
				count={this.state.sequenceCount}
				ref="disp"
			    />
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
    
