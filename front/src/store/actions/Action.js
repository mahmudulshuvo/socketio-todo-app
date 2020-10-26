export const LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA'
export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'
export const SET_USER = 'SET_USER'

export const loadInitialData = (data) => ({
    type: LOAD_INITIAL_DATA,
    list: data,
})

export const addGoal = (data) => ({
    type: ADD_GOAL,
    currentUser: data.user,
    item: data.item,
})

export const removeGoal = (data) => ({
    type: REMOVE_GOAL,
    user: data.user,
    index: data.index,
})

export const setUser = (data) => ({
    type: SET_USER,
    currentUser: data,
})

export const addNewItemSocket = (socket, payload) => {
    socket.emit('addItem', payload)
}

export const removeItemSocket = (socket, payload) => {
    socket.emit('removeItem', payload)
}
