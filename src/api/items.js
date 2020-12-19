import axios from 'axios'
import apiUrl from '../apiConfig'

//axios create req?
export const createItem = (user,data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/items/',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: data
  })
}
