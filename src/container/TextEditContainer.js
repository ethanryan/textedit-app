import React, { Component } from 'react';

// import Clock from '../components/Clock.js';
import TextEdit from '../components/TextEdit.js';



class TextEditContainer extends Component {
  constructor() {
    super()
    this.state = {
      timestamp: '',
      hideTextArea: false,
      choice: '',
      showRoom: 'room4', //default
      // showRoom: '', //default
      // showRoom: 'room4', //default
    };
    // this.handleTextChange = this.handleTextChange.bind(this)
    // this.onChoiceClick = this.onChoiceClick.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.handleHideTextArea = this.handleHideTextArea.bind(this)
  } //end constructor

  // componentDidMount() {
  //   // console.log('after componentDidMount - in TextEditContainer, this.state is: ', this.state)
  // } //componentDidMount

  // handleTextChange = event => {
  //   console.log('text event.target.name: ', event.target.name); // the name of the element (ex: 'room1')
  //   // console.log('Text event.target.value', event.target.value); // the value of the element
  //   // this.setState({text: event.target.value});
  //   const textValue = event.target.value
  //   this.setState({ [event.target.name]: textValue });
  // }

  onChoiceClick = event => {
    // console.log('button event.target.name: ', event.target.name)
    const buttonValue = event.target.name
    // console.log('onChoiceClick - buttonValue: ', buttonValue)
    this.setState({ choice: buttonValue });
    // console.log('setState to choice: ', buttonValue)
  }

  onButtonClick = event => {
    // console.log('button event.target.name: ', event.target.name)
    const buttonValue = event.target.name
    console.log('buttonValue: ', buttonValue)
    this.setState({ showRoom: buttonValue });
    // console.log('setState to showRoom: ', buttonValue)
  }

  handleColorBorder(string) {
    var colorBorder
    if (string === 'room1') {
      colorBorder = {border:'2px solid blue',}
    }
    if (string === 'room2') {
      colorBorder = {border:'2px solid red',}
    }
    if (string === 'room3') {
      colorBorder = {border:'2px solid yellow',}
    }
    return colorBorder
  }

//testing conditionally revealing textarea, but it doesn't effect user joining room...
  handleDisplayNone() {
    var className={display: 'none',}
    return className
  }

  handleHideTextArea() {
    console.log('calling handleHideTextArea...')
    this.setState({ hideTextArea: true });
  }


  render() {

    console.log('TextEditContainer - render - this.state is: ', this.state)
    return (
      <div className='TextEditContainer-style'>

        <h2>
          TextEditContainer
        </h2>

        {/* <Clock
          timestamp={this.state.timestamp}
        /> */}

        <div className="choiceBox">
          <p>
            Ensuring state updates don't affect Yjs.
          </p>
          <button id="a" name="a" onClick={this.onChoiceClick}   className='blueButton'>Choice A</button>
          <button id="b" name="b" onClick={this.onChoiceClick}    className='redButton'>Choice B</button>
          <button id="c" name="c" onClick={this.onChoiceClick} className='yellowButton'>Choice C</button>
          <p>
            Choice: {this.state.choice ? this.state.choice : 'chosen one here'}
          </p>
        </div>

        <button id="showRoom1" name="room1" onClick={this.onButtonClick}   className='blueButton'>Show Room 1</button>
        <button id="showRoom2" name="room2" onClick={this.onButtonClick}    className='redButton'>Show Room 2</button>
        <button id="showRoom3" name="room3" onClick={this.onButtonClick} className='yellowButton'>Show Room 3</button>

        <p>
          Active Room: <span style={this.handleColorBorder(this.state.showRoom)}>
            {this.state.showRoom ? this.state.showRoom : "room name goes here..."}
          </span>
        </p>

        {/* <div style={this.state.choice ? null : this.handleDisplayNone()}> */}
        <div>
          <TextEdit
            showRoom={this.state.showRoom} //this is only prop that TextEdit needs!!!
            hideTextArea={this.state.hideTextArea}
            handleColorBorder={this.handleColorBorder}
            handleDisplayNone={this.handleDisplayNone}
            handleHideTextArea={this.handleHideTextArea}
          />
        </div>

        {/* <TextEdit
          showRoom={'room2'} //this is only prop that TextEdit needs!!!
          handleColorBorder={this.handleColorBorder}
        />

        <TextEdit
          showRoom={'room3'} //this is only prop that TextEdit needs!!!
          handleColorBorder={this.handleColorBorder}
        /> */}

      </div>
    );
  }
}

export default TextEditContainer;
