import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { createBudget } from '../../api/budget'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateBudget extends Component {
  constructor (props) {
    super(props)
    this.state = {
      budget: {
        name: '',
        total: '',
        norOrLater: '',
        dueDate: ''
      },
      createdId: null
    }
  }
  handleChange = (event) => {
    event.persist()

    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      this.setState(currState => {
        const updatedBudget = { ...currState.budget, ...updatedField }
        return { budget: updatedBudget }
      })
    })
  }
    handleSubmit = (event) => {
      event.preventDefault()

      const { user, msgAlert } = this.props

      createBudget(user, this.state.budget)
        .then((res) => {
          this.setState({ createdId: res.data.budget._id })
        })
        .then(() => {
          msgAlert({
            heading: 'Budget created successfully!',
            message: 'Better sooner than later',
            variant: 'success'
          })
        })
        .catch((err) => {
          msgAlert({
            heading: 'BUdget creation failed, try again!',
            message: 'Try again. Error: ' + err.message,
            variant: 'danger'
          })
        })
    }
    render () {
      if (this.state.createdId) {
        return <Redirect to='/view-budgets'/>
      }
      return (
        <React.Fragment>
          <h5>Start new budget</h5>
          <br></br>
          <Form onSubmit={this.handleSubmit}>
            <label>What are you saving for?</label>
            <input
              placeholder="New home? Vacation?"
              value={this.state.budget.name}
              onChange={this.handleChange}
              name='name'
            />
            <br></br>
            <input
              placeholder='How much do you need?'
              value={this.state.budget.total}
              onChange={this.handleChange}
              name='total'
            />
            <br></br>
            <input
              placeholder='Do you need it now?'
              value={this.state.budget.nowOrLater}
              onChange={this.handleChange}
              name='nowOrLater'
              type='boolean'
            />
            <br></br>
            <input
              placeholder='When?'
              value={this.state.budget.dueDate}
              onChange={this.handleChange}
              name='dueDate'
              type='date'
            />
            <br></br>
            <Button type='submit'>Submit</Button>
          </Form>
        </React.Fragment>
      )
    }
}

export default withRouter(CreateBudget)
