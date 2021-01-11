import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Display/Header'
// import LinkHandler from './components/Plaid/LinkHandler'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import SignOut from './components/Auth/SignOut'
import ChangePassword from './components/Auth/ChangePassword'
import CreateItem from './components/Items/Create'
import DestroyItem from './components/Items/Destroy'
import IndexItem from './components/Items/Index'
import UpdateItem from './components/Items/Update'
import CreateBudget from './components/Budget/Create'
import IndexBudget from './components/Budget/Index'
import UpdateBudget from './components/Budget/Update'
import DestroyBudget from './components/Budget/Destroy'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-items/' render={() => (
            <CreateItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-items/:id' render={() => (
            <DestroyItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/view-items' render={() => (
            <IndexItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/items' render={() => (
            <IndexItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-items/:id' render={() => (
            <UpdateItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/budgets' render={() => (
            <CreateBudget msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/view-budgets' render={() => (
            <IndexBudget msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-budgets/:id' render={() => (
            <UpdateBudget msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/delete-budgets/:id' render={() => (
            <DestroyBudget msgAlert={this.msgAlert} user={user} />
          )} />
          {/* <AuthenticatedRoute user={user} path='/transactions' render={
            () => (
              <LinkHandler msgAlert={this.msgAlert} user={user} />
            )} /> */}
        </main>
      </Fragment>
    )
  }
}

export default App
