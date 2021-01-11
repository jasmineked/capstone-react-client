import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showBudget, deleteBudget } from '../../api/budget'
import dateFormat from 'dateformat'
import { Button } from 'react-bootstrap'
// import duration from 'duration'

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
          heading: 'Budget displayed successfully.',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Budget failed to show. Try again.',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteBudget(user, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'Budget deleted succesfully.',
          variant: 'success'
        })
      })
      .then(() => history.push('/view-budgets/'))
      .catch(err => {
        msgAlert({
          heading: 'Failed to delete budget. Try again.',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      {budget ? (
        <div>
          <h5>{budget.name}</h5>
          <h5>${budget.total}</h5>
          <h5>Save by: {dateFormat(budget.dueDate, 'dddd, mmmm dS yyyy')}</h5>
          <h5>Created on: {dateFormat(budget.timestamps, 'dddd, mmmm dS yyyy')}</h5>
          <Button onClick={handleDelete}delete>Delete</Button>{' '}
          <Button href={'#/update-budgets/' + budget._id}>Update</Button>
        </div>
      ) : 'Loading...please...please wait'
      }
    </div>
  )
}

export default withRouter(DestroyBudget)
