import React, { Component } from 'react';

import Yjs from '../components/Yjs.js';


class Summernote extends Component {

  componentDidMount() {
    console.warn('Summernote - componentDidMount...')

    // window.$('.summernote').summernote()

    window.$('.summernote').summernote({
      placeholder: 'Hello stand alone ui',
      tabsize: 2,
      height: 100
    });

  }

  // comment out the below to re-render Summernote on every click -- using this life cycle method to prevent Summernote and Yjs from needlessly re-rendering, note: React docs say NOT to use this method for this purpose
shouldComponentUpdate(nextProps) {
  if (this.props.connectionExists === nextProps.connectionExists) { //these two should always be equal...
    console.warn('Summernote - (this.props.connectionExists === nextProps.connectionExists), so returning FALSE in shouldComponentUpdate... AKA no re-render...')
    return false; // don't re-render this component (or its children) if the only state change is "a", "b", or "c" getting clicked...
  } else {
    return true; //default return value for shouldComponentUpdate is true
  }
}

  render() {
    console.log('Summernote - render - this.props is: ', this.props)

    return (
      // <div className='Summernote-style'>
      <div>

        <h3>
          Summernote component - renders Yjs and textarea
        </h3>

        <p>
          (if Yjs renders TextArea, it creates an infinite loop)
        </p>

        <p>
          <span>
            Summernote: {this.props.showRoom ? this.props.showRoom : "room name goes here..."}
          </span>
        </p>

        {/* commenting out Yjs for now... */}
        {/* commenting out Yjs for now... */}
        {/* commenting out Yjs for now... */}
        <Yjs
          showRoom={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
          handleColorBorder={this.props.handleColorBorder}
          connectionExists={this.props.connectionExists}
          texteditorIsSummernote={true}
        />

        {this.props.connectionExists === true ?
          <div>
            {/* <div id="summernote"> */}
              {/* Hello Summernote */}
            {/* </div> */}

            <form method="post">
              {/* <textarea id="summernote" name="editordata"></textarea> */}
              <textarea
                // style={{border: "5px solid red"}} //overriding text-align: center set in App
                className="summernote"
                name="editordata"
                id={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
                >
                </textarea>
            </form>


            {/* <textarea
              className="fullWidth"
              style={this.props.handleColorBorder(this.props.showRoom)}
              id={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
              rows="4"
              cols="80"
              placeholder="textarea inside SummernoteContainer..."
              >
            </textarea> */}
          </div>
          :
          <h4>
            Summernote here when connection exists.
          </h4>
          }

        </div>
      );
    }
  }

  export default Summernote;
