import React from 'react'
import TextField from '@material-ui/core/TextField'

const AddTodoField = ({ addNew }) => {
  return (
    <TextField
      id='standard-error'
      label='Add New'
      defaultValue=''
      helperText='Type new todos and press enter to add'
      onKeyDown={addNew}
      style={{
        margin: 20
      }}
    />
  )
}

export default AddTodoField
