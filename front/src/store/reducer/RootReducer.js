import {
    SET_USER,
    ADD_GOAL,
    REMOVE_GOAL,
    LOAD_INITIAL_DATA,
} from '../actions/Action'
import io from 'socket.io-client'

const initialState = {
    users: [],
    currentUser: '',
}

let socket

if (!socket) {
    socket = io(':3001')
}

const rootReducer = (state = initialState, payload) => {
    const copyState = state
    switch (payload.type) {
        case LOAD_INITIAL_DATA:
            return Object.assign({}, state, {
                ...state,
                users: payload.list,
            })

        case ADD_GOAL:
            for (var i = 0; i < copyState.users.length; i++) {
                if (copyState.users[i].username === payload.currentUser) {
                    copyState.users[i].todos.push(payload.item)
                }
            }
            return Object.assign({}, state, {
                ...copyState,
            })

        case REMOVE_GOAL:
            for (i = 0; i < copyState.users.length; i++) {
                if (copyState.users[i].username === payload.user) {
                    copyState.users[i].todos.splice(payload.index, 1)
                }
            }
            return Object.assign({}, state, {
                ...copyState,
            })

        case SET_USER:
            return Object.assign({}, state, {
                currentUser: payload.currentUser,
            })

        default:
            return state
    }
}

export default rootReducer
