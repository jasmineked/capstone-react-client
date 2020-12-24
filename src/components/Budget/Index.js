import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { indexBudget } from '../../api/budget'

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
        console.log(res)
        this.setState({ budgetArray: res.data.budgets })
      })
      .then(() => {
        msgAlert({
          heading: 'Look at em!',
          message: 'yay!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Index Failed :(',
          message: 'error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.budgetArray) {
      return (
        'is this loading, tf'
      )
    } else if (this.state.budgetArray.length === 0) {
      return (
        'create a new budget bewlo!'
      )
    } else {
      return (
        <div>
          <div>
            {this.state.budgetArray.map(budget => (
              <Fragment key={budget._id}>
                <h2>{budget.name}</h2>
                <h4>{budget.total}</h4>
                <h5>{budget.dateDue}</h5>
                <p></p>
                <Link to={`/delete-budgets/${budget._id}`}>Modify</Link>
              </Fragment>
            ))}
          </div>
        </div>
      )
    }
  }
}

export default withRouter(IndexBudget)
