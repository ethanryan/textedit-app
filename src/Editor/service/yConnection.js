export const Y = require('yjs')

// YjsQuill plugins
require('y-memory')(Y)
require('y-array')(Y)
require('y-richtext')(Y)
require('y-websockets-client')(Y)

var io = Y['websockets-client'].io //need to get this.....


// export var link = 'http://localhost:1234' //when running textedit-app-yjs-websockets-server locally
// var link = 'http://localhost:5000' //when running `heroku local web`
export var link = process.env.REACT_APP_YJS_HEROKU_URL //this link is set in my .env file, which is hidden from github

// create a connection
export var connection = io(link) 