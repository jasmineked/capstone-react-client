import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { indexItem } from '../../api/item'

class IndexItem extends Component {
  constructor () {
    super()
    this.state = {
      itemArray: []
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props

    indexItem(user)
      .then(res => {
        console.log(res)
        this.setState({ itemArray: res.data.items })
      })
      .then(() => {
        msgAlert({
          heading: 'Look at em',
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
    if (!this.state.itemArray) {
      return (
        'console log ' + this.state.item
      )
    } else if (this.state.itemArray.length === 0) {
      return (
        ':|'
      )
    } else {
      return (
        <div>
          {this.state.itemArray.map(item => (
            <Fragment key={item._id}>
              <h2>{item.name}</h2>
              <p></p>
              <Link to={`/items/${item._id}`}>See more</Link>
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default withRouter(IndexItem)
