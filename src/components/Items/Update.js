import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showItem, updateItem } from '../../api/item'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const UpdateItem = (props) => {
  const [item, setItem] = useState({ name: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    // show request Here
    showItem(user, match.params.id)
      .then(res => setItem(res.data.item))
      .then(() => msgAlert({
        heading: 'See it? Im showing it',
        message: 'okayyyyyyy',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'item cant show',
        message: 'error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setItem(prevItem => {
      const updatedItem = { ...prevItem, ...updatedField }
      return updatedItem
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateItem(user, item, match.params.id)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: item.name + 'link updated',
        message: 'update success',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'update failed',
        message: 'oh no ' + err.message,
        variant: 'danger'
      }))
  }
  if (updated) {
    return (
      <Redirect to={`/items/${match.params.id}`} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Items</h1>
      <Form onSubmit={handleSubmit}>
        <input
          placeholder='link here'
          value={item.name}
          onChange={handleChange}
          name='name'
        />
        <Button type='submit'>update link</Button>
      </Form>
    </React.Fragment>
  )
}
export default withRouter(UpdateItem)
