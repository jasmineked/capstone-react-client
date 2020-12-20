import axios from 'axios'
import apiUrl from '../apiConfig'

// axios create req
export const createItem = (user, data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/items/',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { item: data }
  })
}

// delete req
export const deleteItem = (user, itemId) => {
  return axios({
    url: apiUrl + '/items/' + itemId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// show req
export const showItem = (user, itemId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/items/' + itemId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

//INDEX
export const indexItem = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/items',
    headers: {
      'Authorization': `Token Token=${user.token}`
    }
  })
}
