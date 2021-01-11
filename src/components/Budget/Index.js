import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { indexBudget } from '../../api/budget'
// import LinkHandler from '../Plaid/LinkHandler'
import Card from 'react-bootstrap/Card'
import dateFormat from 'dateformat'

// import CreateBudget from '../Budget/Create'

class IndexBudget extends Component {
  constructor () {
    super()
    this.state = {
      budgetArray: []
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props

    indexBudget(user)
      .then(res => {
        // console.log(res)
        this.setState({ budgetArray: res.data.budgets })
      })
      .then(() => {
        msgAlert({
          heading: 'Indexed Budgets successfully',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Failed to index budgets',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.budgetArray) {
      return (
        'loading'
      )
    } else if (this.state.budgetArray.length === 0) {
      return (
        <Link to={'/budgets/'}>Create new budget here.</Link>
      )
    } else {
      return (
        <div>
          <div className='cardsIndex'>
            {this.state.budgetArray.map(budget => (
              <Fragment key={budget._id}>
                <Card style={{ width: '270px', margin: '10px', height: '175px' }}>
                  <Card.Body>
                    <Card.Title>{budget.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">${budget.total}</Card.Subtitle>
                    <Card.Text>Due: {dateFormat(budget.dueDate, 'dddd, mmmm dS, yyyy')}</Card.Text>
                    <Card.Link href={`#/delete-budgets/${budget._id}`}>Edit Goal</Card.Link>
                  </Card.Body>
                </Card>
              </Fragment>
            ))}
          </div>
          <Link to={'/budgets/'}>Create new budget here.</Link>
          <br></br>
          <Link to={'/transactions'}>Connect with Plaid.</Link>
        </div>
      )
    }
  }
}

export default withRouter(IndexBudget)
