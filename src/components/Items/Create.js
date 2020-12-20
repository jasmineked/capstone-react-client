import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { createItem } from '../../api/item'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {
        name: ''
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
        const updatedItem = { ...currState.item, ...updatedField }
        return { item: updatedItem }
      })
    })
  }
    handleSubmit = (event) => {
      event.preventDefault()

      const { user, msgAlert } = this.props

      createItem(user, this.state.item)
        .then((res) => {
          this.setState({ createdId: res.data.item._id })
        })
        .then(() => {
          msgAlert({
            heading: 'Item created successfully ',
            message: 'good job',
            variant: 'success'
          })
        })
        .catch((err) => {
          msgAlert({
            heading: 'Item creation failed, try again!',
            message: 'Try again. Error: ' + err.message,
            variant: 'danger'
          })
        })
    }
    render () {
      if (this.state.createdId) {
        return <Redirect to='/home/'/>
      }
      return (
        <React.Fragment>
          <h1>Add link to item here</h1>
          <Form onSubmit={this.handleSubmit}>
            <input
              placeholder="type here"
              value={this.state.item.name}
              onChange={this.handleChange}
              name='name'
            />
            <Button type='submit'>Submit</Button>
          </Form>
        </React.Fragment>
      )
    }
}

export default withRouter(CreateItem)
