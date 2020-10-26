import React from 'react'
import TextField from '@material-ui/core/TextField'

const UsernameForm = ({ isValid, tryCount, keyPress }) => {
    return (
        <TextField
            error={!isValid && tryCount > 0 ? true : false}
            id='username'
            label='Username'
            placeholder='Placeholder'
            margin='normal'
            variant='outlined'
            helperText={
                tryCount === 0
                    ? 'Please insert username "sam", "rachel" or "walter" and press enter'
                    : 'Your username is not valid!'
            }
            onKeyDown={keyPress}
            style={{
                width: '50%',
            }}
        />
    )
}

export default UsernameForm
