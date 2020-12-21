import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showItem, deleteItem } from '../../api/item'

import Button from 'react-bootstrap/Button'

const DestroyItem = (props) => {
  // const [loading, setLoading] = useState(null)
  const [item, setItem] = useState(null)
  const { user, msgAlert, match, history } = props

  // useEffect for componentDidMount?? pls get back to this
  // load profile to show action
  useEffect(() => {
    // runs just once on mount
    // const { id } = props.match.params
    showItem(user, match.params.id)
      .then(res => {
        setItem(res.data.item)
      })
      .then(() => {
        msgAlert({
          heading: 'oooooh ur item is showing!ol',
          message: 'See Item? Good.',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Item Failed BOOO',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteItem(user, match.params.id)
      .then(() => {
        msgAlert({
          heading: item.name + 'deleted',
          message: 'wtf bro',
          variant: 'success'
        })
      })
      .then(() => history.push('/items'))
      .catch(err => {
        msgAlert({
          heading: 'Real programmers create and destroy',
          message: 'its safe to say...you did not destroy..' + err.message,
          variant: 'danger'
        })
      })
  }

  // if loading (aka item = null), print LOADING, let user know wassup
  return (
    <div>
      {item ? (
        <div>
          <h2>{item.name}</h2>
          <Button onClick={handleDelete}Delete>delete</Button>
          <Link to={'/update-items/' + item._id}>Update Item</Link>
        </div>
      ) : 'Loading...please...please wait'
      }
    </div>
  )
}

export default withRouter(DestroyItem)
