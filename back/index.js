require('dotenv').config()
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const mongoConfig = require('./mongo-config')

// recreate database

app.use(cors())

// var corsOptions = {
//     origin: 'http://localhost:8080',
//     optionsSuccessStatus: 200, // For legacy browser support
// }

// app.use(cors())

// var allowedOrigins = ['http://localhost:3000']
// app.use(
//     cors({
//         origin: function (origin, callback) {
//             // allow requests with no origin
//             // (like mobile apps or curl requests)
//             if (!origin) return callback(null, true)
//             if (allowedOrigins.indexOf(origin) === -1) {
//                 var msg =
//                     'The CORS policy for this site does not ' +
//                     'allow access from the specified Origin.'
//                 return callback(new Error(msg), false)
//             }
//             return callback(null, true)
//         },
//     })
// )

const apiRoutes = require('./routes/routes')
// Use Api routes in the App
app.use('/api', apiRoutes)

const userModel = require('./model/UserModel')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

console.log(mongoConfig.uri)
// MONGOOSE CONNECT
mongoose.connect(mongoConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
var db = mongoose.connection
db.on('error', () => {
    console.log('---FAILED to connect to mongoose')
})
db.once('open', () => {
    console.log('+++ connected to mongoose')

    if (db.collections.users) {
        console.log('exist!!')
        db.collection('users').countDocuments(function (err, count) {
            if (!err && count === 0) {
                insertUsers()
            }
        })
    } else {
        console.log('Not exist!!')
        db.createCollection('users', (err, res) => {
            if (err) {
                console.log('collection creation failed!!')
            } else {
                insertUsers()
            }
        })
    }
})

const insertUsers = () => {
    db.collection('users').createIndex({ username: 1 }, { unique: true })
    db.collection('users').insertMany(
        [
            { username: 'sam', todos: ['Fishing', 'Swimming', 'Dancing'] },
            { username: 'walter', todos: ['Gossip', 'Theater', 'Dinner'] },
            { username: 'rachel', todos: ['School', 'Theatre', 'Meeting'] },
        ],
        (err, result) => {
            if (err) {
                console.log(err + 'failed to insert!')
            } else {
                console.log('insertion successful!')
            }
        }
    )
}

io.on('connection', function (socket) {
    console.log('a user connected')

    socket.on('addItem', (payload) => {
        userModel.findOne({ username: payload.user }, (err, user) => {
            if (err) {
                console.log('Err!! data not found!!')
            } else {
                var todos = user.todos
                todos.push(payload.item)
                userModel.updateOne(
                    { username: payload.user },
                    { username: payload.user, todos: todos },
                    (err, res) => {
                        if (err) {
                            console.log('Add new item failed!!')
                        } else {
                            console.log('New item added!!')
                            io.emit('itemAdded', payload)
                        }
                    }
                )
            }
        })
    })

    socket.on('removeItem', (payload) => {
        userModel.findOne({ username: payload.user }, (err, user) => {
            if (err) {
                console.log('Err!! data not found!!')
            } else {
                var todos = user.todos
                todos.splice(payload.index, 1)
                userModel.updateOne(
                    { username: payload.user },
                    { username: payload.user, todos: todos },
                    (err, res) => {
                        if (err) {
                            console.log('Add new item failed!!')
                        } else {
                            console.log('Item removed!!')
                            io.emit('itemRemoved', payload)
                        }
                    }
                )
            }
        })
    })

    userModel.find({}, '-_id username todos', (err, result) => {
        if (err) {
            console.log('--- GET failed!!')
        } else {
            socket.emit('loadinitials', result)
        }
    })
})

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>')
})

const port = process.env.PORT || 3001

http.listen(port, function () {
    console.log('listening on *:', port)
})

// app.listen(port)

module.exports = http
