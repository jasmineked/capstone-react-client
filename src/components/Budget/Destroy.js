import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showBudget, deleteBudget } from '../../api/budget'

import Button from 'react-bootstrap/Button'

const DestroyBudget = (props) => {
  const [budget, setBudget] = useState(null)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    showBudget(user, match.params.id)
      .then(res => {
        setBudget(res.data.budget)
      })
      .then(() => {
        msgAlert({
          heading: 'oooooh ur budget is showing!ol',
          message: 'k.',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Budget Failed BOOO',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteBudget(user, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'deleted',
          message: 'yes',
          variant: 'success'
        })
      })
      .then(() => history.push('/budgets'))
      .catch(err => {
        msgAlert({
          heading: 'fail tdelete',
          message: '..' + err.message,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      {budget ? (
        <div>
          <h2>{budget.name}</h2>
          <Button onClick={handleDelete}delete>delete</Button>
          <Link to={'/update-budgets/' + budget._id}>Update Budget</Link>
        </div>
      ) : 'Loading...please...please wait'
      }
    </div>
  )
}

export default withRouter(DestroyBudget)
