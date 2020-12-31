import React, { useState, useEffect, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showBudget, deleteBudget } from '../../api/budget'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

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
          <div className='cardsShow'>
            <Fragment key={budget._id}>
              <Card style={{ width: '250px', margin: '10px', height: '150px' }}>
                <Card.Body>
                  <Card.Title>{budget.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">${budget.total}</Card.Subtitle>
                  <Card.Text>
                    {budget.dueDate}</Card.Text>

                </Card.Body>
              </Card>
            </Fragment>
          </div>
          <Button onClick={handleDelete} delete>delete</Button>
          <Link to={'/update-budgets/' + budget._id}>Update Budget</Link>
        </div>
      ) : 'Loading...please...please wait'
      }
    </div>
  )
}

export default withRouter(DestroyBudget)
