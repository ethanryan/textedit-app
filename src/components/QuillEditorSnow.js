import React from 'react';

// import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css'; //need to import this for snow CSS to display correctly...

import Quill from 'quill/core'; //must be from core for functions to work!!!
import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow'; //snow works, but need to import and register formats, and replace icons...

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';
import Underline from 'quill/formats/underline';
import Link from 'quill/formats/link';
import List, { ListItem } from 'quill/formats/list';

import Icons from 'quill/ui/icons'; //need to import icons, then replace them...

class QuillEditorSnow extends React.Component {

  componentDidMount() {
    console.warn('1. QuillEditorSnow - componentDidMount...')

    Quill.register({
      'modules/toolbar': Toolbar,
      'themes/snow': Snow,
      'formats/bold': Bold,
      'formats/italic': Italic,
      'formats/header': Header,
      'formats/underline': Underline,
      'formats/link': Link,
      'formats/list': List,
      'formats/list/item': ListItem,
      'ui/icons': Icons
    });

    var icons = Quill.import('ui/icons');
    icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
    icons['italic'] = '<i class="fa fa-italic" aria-hidden="true"></i>';
    icons['underline'] = '<i class="fa fa-underline" aria-hidden="true"></i>';
    icons['link'] = '<i class="fa fa-link" aria-hidden="true"></i>';
    icons['clean'] = '<i class="fa fa-eraser" aria-hidden="true"></i>'; // making this an eraser for now because i can't find the font awesome equivalent of the Tx / clear / clean icon...

    new Quill('#editor', {
      theme: 'snow' //this needs to come after the above, which registers Snow...
    });

    //replacing unrendered svg string in dropdown with an empty string, then adding sort icon in css...
    var dropdown = document.getElementsByClassName('ql-picker-label'); //changing text here, can't do it in css...
    dropdown[0].innerText = "";

    //lists both have same class, but different values, so changing them here...
    var list = document.getElementsByClassName('ql-list');
    list[0].innerHTML = '<i class="fa fa-list-ol" aria-hidden="true"></i>' //ordered list
    list[1].innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"></i>' //unordered list
  } //componentDidMount

  render() {
    console.warn('0. QuillEditorSnow - render...')
    return (
      <div className="standalone-container">
        <div id="QuillEditorSnow-container">
          {/* <!-- Create the editor container --> */}
          <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p></p>
          </div>
        </div>
      </div>
    )
  }
}

export default QuillEditorSnow;
