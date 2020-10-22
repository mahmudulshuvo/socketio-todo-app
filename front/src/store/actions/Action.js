export const LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_USER = 'SET_USER'

export const loadInitialData = data => ({
  type: LOAD_INITIAL_DATA,
  list: data
})

export const addTodo = data => ({
  type: ADD_TODO,
  currentUser: data.user,
  item: data.item
})

export const removeTodo = data => ({
  type: REMOVE_TODO,
  user: data.user,
  index: data.index
})

export const setUser = data => ({
  type: SET_USER,
  currentUser: data
})

export const addNewItemSocket = (socket, payload) => {
  socket.emit('addItem', payload)
}

export const removeItemSocket = (socket, payload) => {
  socket.emit('removeItem', payload)
}
