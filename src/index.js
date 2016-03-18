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
	this.switchedOn = true;

	this.sounds = [
	    new Audio("https://dl.dropboxusercontent.com/u/10922351/sounds/simon/simonSound1.mp3"),
	    new Audio("https://dl.dropboxusercontent.com/u/10922351/sounds/simon/simonSound2.mp3"),
	    new Audio("https://dl.dropboxusercontent.com/u/10922351/sounds/simon/simonSound3.mp3"),
	    new Audio("https://dl.dropboxusercontent.com/u/10922351/sounds/simon/simonSound4.mp3")
	];
	
	this.state = {
	    disableClicks: true,
	    counterMsg: "--",
	    strict: false
	};

	this.startGame = this.startGame.bind(this);
	this.onOffSwitch = this.onOffSwitch.bind(this);
	this.toggleStrict = this.toggleStrict.bind(this);
    }

    // I took out this switch. It's not in the user stories, and makes the game worse.
    onOffSwitch() {
	    // click handler for switch button
	    this.switchedOn = !this.switchedOn;
    }

    toggleStrict() {
	this.setState({strict: !this.state.strict});
    }

    // initialise and start the game
    startGame() {
	// click handler for start button

	if (this.switchedOn) {
	    if (this.anim !== null) {
		for (var i = 0; i < 4; i++) {
		    this.refs[i].unhighlight();
		}
		
		clearInterval(this.anim);
		this.anim = null;
	    }
	    this.pIndex = 0;
	    this.sequence = [];	    

	    this.flashCounter("--", this.compTurn);
	}
    }

    // flashes the display counter then calls the next function
    flashCounter(msg, callback) {
	this.setState({counterMsg: msg},
		      () => {
			  this.refs["disp"].flash();
		      });
	if (callback) {
	    setTimeout(callback.bind(this), 1800);
	}
	// help! I'm stuck in callback hell!
    }
    
    compTurn() {
	if (this.sequence.length === 3) {
	    this.flashCounter("**");
	}
	else {
	    this.createSequence();
	    this.displaySequence();
	    this.playerTurn();
	}
    }

    playerTurn() {
	this.pIndex = 0;
	// now wait for player to enter sequence
    }

    // creates a random sequence of button presses
    createSequence() {
	this.sequence.push(Math.floor(Math.random() * 4));
	this.setState({counterMsg: this.sequence.length});
	console.log(this.sequence);
    }

    // flashes the game buttons in sequence
    displaySequence() {
	
	if (this.anim === null && this.sequence.length > 0) {
	    let animStart = 0;
	    let index = 0;
	    let ref = this.sequence[index];
	    this.setState({disableClicks: true});

	    this.anim = setInterval(function() {
		animStart += 25;
		if (animStart === 500) {
		    this.refs[ref].highlight();
		    this.sounds[ref].play();
		}
		else if (animStart >= 1000) {
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
	    }.bind(this), 25);
	}
    }

    
    gameBtnClicked(btnId) {
	this.sounds[btnId].play();
	if (btnId === this.sequence[this.pIndex]) {
	    // player enters correct button
	    this.pIndex++;
	    if (this.pIndex === this.sequence.length) {
		this.compTurn();
	    }
	}
	else {
	    // player enters incorrect button
	    this.pIndex = 0;

	    if (!this.state.strict) {
		this.flashCounter("!!", () =>
		    {
			this.setState({counterMsg:this.sequence.length});
			this.displaySequence();
		    });
	    }
	    else {
		this.flashCounter("!!", this.startGame);
	    }
	}

    }

    playSound(index) {
	console.log("play");
	this.sounds[index].play;
    }
    
	    
    render() {
	return (
	    <div>
		<div className="container">
		    <div className="vert controls">
			<div className="title">Simon</div>
			<div className="row buttons">
			    
			    <CountDisplay
				msg={this.state.counterMsg}
				ref="disp"
			    />
			    <div className="vert start">
				<div onClick={this.startGame}
				     className="icon"></div>
				<div className="label">START</div>
			    </div>

			    <div className="vert strict" onClick={this.toggleStrict}>
				<div className={classnames("indicator",
							   {on: this.state.strict})}>
				</div>
				<div className="icon"></div>
				<div className="label">STRICT</div>
			    </div>
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
    
