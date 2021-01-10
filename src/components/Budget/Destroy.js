import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showBudget, deleteBudget } from '../../api/budget'
import dateFormat from 'dateformat'
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
      .then(() => history.push('/view-budgets/'))
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
          <h5>{budget.name}</h5>
          <h5>${budget.total}</h5>
          <h5>Save by: {dateFormat(budget.dueDate, 'dddd, mmmm dS yyyy')}</h5>
          <h5>time left:</h5>
          <h5>total time: </h5>
          <Button onClick={handleDelete}delete>Delete</Button>{' '}
          <br></br>
          <Button href={'#/update-budgets/' + budget._id}>Update</Button>
        </div>
      ) : 'Loading...please...please wait'
      }
    </div>
  )
}

export default withRouter(DestroyBudget)
