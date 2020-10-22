import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {
  addTodo,
  removeTodo,
  setUser,
  addNewItemSocket,
  removeItemSocket,
  loadInitialData
} from './store/actions/Action'
import { withStyles } from '@material-ui/styles'
import UsernameForm from './components/UsernameForm/UsernameForm'
import AddTodoField from './components/AddTodoField/AddTodoField'
import TodoList from './components/TodoList/TodoList'

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexDirection: 'row',
    margin: 100
  },
  button: {
    marginTop: 20,
    marginBottom: 20
  },
  paper: {
    display: 'flex',
    padding: 20,
    textAlign: 'center',
    color: 'gray'
  },
  inputForm: {
    display: 'flex',
    width: '40%'
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%'
  },
  textField: {
    width: '50%'
  }
})

function mapStateToProps (state) {
  return {
    data: state
  }
}

const socket = io.connect('http://localhost:3001')

class App extends Component {
  constructor (props) {
    super(props)
    const { dispatch } = this.props

    this.state = {
      isValid: false,
      try: 0
    }

    socket.on('loadinitials', res => {
      dispatch(loadInitialData(res))
    })

    socket.on('itemAdded', res => {
      dispatch(addTodo(res))
    })

    socket.on('itemRemoved', res => {
      dispatch(removeTodo(res))
    })

    this.keyPress = this.keyPress.bind(this)
    this.addNew = this.addNew.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  componentWillUnmount () {
    socket.disconnect()
    alert('Disconnecting Socket!')
  }

  keyPress (e) {
    const { dispatch } = this.props
    if (e.keyCode === 13) {
      if (this.usernameIsValid(e.target.value)) {
        dispatch(setUser(e.target.value))
      } else {
        this.setState({
          isValid: false
        })
      }
    }
  }

  removeItem = index => () => {
    const { currentUser } = this.props.data
    const payload = {
      index: index,
      user: currentUser
    }
    removeItemSocket(socket, payload)
  }

  addNew = e => {
    const { currentUser } = this.props.data
    if (e.keyCode === 13 && e.target.value !== '') {
      const payload = {
        user: currentUser,
        item: e.target.value
      }
      addNewItemSocket(socket, payload)
      e.target.value = ''
    }
  }

  usernameIsValid = username => {
    if (username === 'sam' || username === 'walter' || username === 'rachel') {
      this.setState({
        isValid: true,
        try: 0
      })
      return true
    } else {
      this.setState({
        isValid: false,
        try: 1
      })
      return false
    }
  }

  showData = async () => {
    await fetch('http://localhost:3001/api/users')
      .then(resp => resp.json())
      .then(result => {
        console.log(JSON.stringify(result, undefined, 4))
        alert('Please check the console!!')
      })
  }

  render () {
    const { classes } = this.props
    const { users, currentUser } = this.props.data
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <div className={classes.inputForm}>
                <UsernameForm
                  isValid={this.state.isValid}
                  tryCount={this.state.try}
                  keyPress={this.keyPress}
                ></UsernameForm>
              </div>

              <div className={classes.todoList}>
                <Paper style={{ width: '100%' }}>
                  {this.state.isValid ? (
                    <Typography variant='h5' gutterBottom>
                      {currentUser}'s To do List
                    </Typography>
                  ) : (
                    <Typography variant='h5' gutterBottom>
                      To do List
                    </Typography>
                  )}
                </Paper>
                {this.state.isValid ? (
                  <AddTodoField addNew={this.addNew}></AddTodoField>
                ) : (
                  <div />
                )}
                {this.state.isValid ? (
                  <div style={{ maxHeight: 400, overflow: 'auto' }}>
                    <TodoList
                      users={users}
                      isValid={this.state.isValid}
                      currentUser={currentUser}
                      removeItem={this.removeItem}
                    ></TodoList>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant='contained'
          className={classes.button}
          onClick={this.showData}
        >
          Show User JSON
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps)(App))
