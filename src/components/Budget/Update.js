import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showBudget, updateBudget } from '../../api/budget'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const UpdateBudget = (props) => {
  const [budget, setBudget] = useState({ name: '', total: '', nowOrLater: '', dueDate: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    // show request Here
    showBudget(user, match.params.id)
      .then(res => setBudget(res.data.budget))
      .then(() => msgAlert({
        heading: 'budget showing',
        message: 'mmmm',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'budget failed show',
        message: 'error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setBudget(prevBudget => {
      const updatedBudget = { ...prevBudget, ...updatedField }
      return updatedBudget
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateBudget(user, budget, match.params.id)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: budget.name + ' budget updated',
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
      <Redirect to={`/view-budgets/${match.params.id}`} />
    )
  }

  return (
    <React.Fragment>
      <h5>Update budget</h5>
      <br></br>
      <Form onSubmit={handleSubmit}
        className='updateBudgetForm'>
        <Form.Group controlId="budgetNameForm">
          <Form.Label>What are you saving for?</Form.Label>
          <Form.Control
            placeholder="New home? Vacation?"
            value={budget.name}
            onChange={handleChange}
            name='name'
          />
        </Form.Group>
        <Form.Group controlId='budgetTotalForm'>
          <Form.Label>How much do you need?</Form.Label>
          <Form.Control placeholder='$'
            value={budget.total}
            onChange={handleChange}
            name='total'
          />
        </Form.Group>
        {/* <input
          placeholder='Do you neeSd it now?'
          value={budget.nowOrLater}
          onChange={handleChange}
          name='nowOrLater'
          type='boolean'
        /> */}
        <Form.Group controlId='budgetDueDate'>
          <Form.Label>When do you need it by?</Form.Label>
          <Form.Control
            placeholder='When?'
            value={budget.dueDate}
            onChange={handleChange}
            name='dueDate'
            type='date'
          />
        </Form.Group>
        <Button type='submit'>Submit</Button>
      </Form>
    </React.Fragment>
  )
}
export default withRouter(UpdateBudget)
