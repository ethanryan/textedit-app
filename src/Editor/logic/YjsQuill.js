import React from 'react'
import { Y, connection, link } from '../service/yConnection';

const YjsQuill = ({handleColorBorder, showRoom, connectionExists}) => {
    //console.logging connection details here won't show until state is updated...
    //note: above logs work after i update state.... -- moved to within promise!

    console.log('YjsQuill - render - this.props is: ', showRoom)

    // var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below

    console.log('YjsQuill -->>> connection in render is: ', connection)
    console.log('YjsQuill -->>> connection.connected in render is: ', connection.connected)
    console.log('YjsQuill -->>> connection.id in render is: ', connection.id)

    var connectionId = connection.id
    console.log('connectionId is: ', connectionId)

    if (connectionExists === false) {
        console.log('YjsQuill --->> this.props.connectionExists === false')
        // connection.destroy() //this works! server log shows 'user left', and updates to text don't sync on reconnect... (calling disconnect() instead of destroy() made updates still sync.)
        connection.disconnect()
        console.log('connection disconnected...')
        console.log('USER LEFT, connection DESTROYED.')
    } //end if statement

    //putting Y within a ternary operator, so it only gets rendered if connectionExists...
    if (connectionExists === true) {

        Y({
            db: {
                name: 'memory'
            },
            connector: {
                name: 'websockets-client', // use the websockets-client connector
                room: showRoom, // passing in room from props...
                socket: connection, // passing connection above as the socket...
                url: link // the connection endpoint (see y-websockets-server)
            },
            share: {
                richtext: 'Richtext' // y.share.richtext is of type Y.Richtext
            }
            // }).then(function (y) {
        }).then((y) => {

            window.yquill = y

            var toolbarOptions = [
                // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'font': [] }],
                ['bold', 'italic', 'underline', 'strike', 'link'],
                [{ 'color': [] }, { 'background': [] }],        // toggled buttons
                ['blockquote', 'code-block'],
                ['video', 'image'],
                [{ 'align': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                ['clean']                                         // remove formatting button
            ];

            window.quill = new window.Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions,
                },
                theme: 'snow',
                placeholder: "Write something awesome..."
            });

            // window.quill = new Quill('#editor', {
            //   theme: 'snow' //this needs to come after the above, which registers Snow...
            // });

            // bind quill to richtext type
            //NOTE: NEED TO INCLUDE BELOW LINE:::::::
            y.share.richtext.bindQuill(window.quill)
        })
    } //end if statement


    return (
        <div className="Yjs-style">

            {/* <h3>
          YjsQuill component - connectionExists: {this.props.connectionExists ? "true" : "false"}
        </h3> */}

            <p>
                <span style={handleColorBorder(showRoom)}>
                    YjsQuill: {showRoom}
                </span>
            </p>

        </div>
    )
}

export default YjsQuill
