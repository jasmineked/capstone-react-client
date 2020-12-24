import axios from 'axios'
import apiUrl from '../apiConfig'

export const createBudget = (user, data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/budgets/',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { budget: data }
  })
}

export const indexBudget = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/budgets',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updateBudget = (user, budget, budgetId) => {
  return axios({
    url: apiUrl + '/budgets/' + budgetId,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { budget: budget }
  })
}

export const showBudget = (user, budgetId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/budgets/' + budgetId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteBudget = (user, budgetId) => {
  return axios({
    url: apiUrl + '/budgets/' + budgetId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
