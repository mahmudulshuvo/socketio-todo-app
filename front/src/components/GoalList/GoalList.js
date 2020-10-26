import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

const GoalList = ({ users, currentUser, removeItem, isValid }) => {
    return (
        <List
            component='nav'
            aria-label='secondary mailbox folders'
            style={{ width: '100%' }}
        >
            {users && isValid
                ? users.map((user, index) =>
                      user.username === currentUser ? (
                          user.todos.map((item, i) => (
                              <div key={i}>
                                  <ListItem button>
                                      <ListItemText primary={item} />
                                      <ListItemSecondaryAction>
                                          <IconButton
                                              edge='end'
                                              aria-label='delete'
                                              onClick={removeItem(i)}
                                          >
                                              <DeleteIcon />
                                          </IconButton>
                                      </ListItemSecondaryAction>
                                  </ListItem>
                                  <Divider></Divider>
                              </div>
                          ))
                      ) : (
                          <div key={index} />
                      )
                  )
                : ''}
        </List>
    )
}

export default GoalList
