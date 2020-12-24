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
      <h1>Update Budget</h1>
      <Form onSubmit={handleSubmit}>
        <label>What are you saving for?</label>
        <input
          placeholder="New home? Vacation?"
          value={budget.name}
          onChange={handleChange}
          name='name'
        />
        <input
          placeholder='How much do you need?'
          value={budget.total}
          onChange={handleChange}
          name='total'
        />
        {/* <input
          placeholder='Do you need it now?'
          value={budget.nowOrLater}
          onChange={handleChange}
          name='nowOrLater'
          type='boolean'
        /> */}
        <input
          placeholder='When?'
          value={budget.dueDate}
          onChange={handleChange}
          name='dueDate'
          type='date'
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </React.Fragment>
  )
}
export default withRouter(UpdateBudget)
