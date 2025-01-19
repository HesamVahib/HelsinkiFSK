import axios from 'axios'
const mainUrl = 'http://localhost:3000/persons'

const getAll = () => {
    const request = axios.get(mainUrl)
    return (
      request
      .then(response => response.data)
      .catch(error => {
        console.log('error', error)
      }))
  }

const create = newObject => {
  const request = axios.post(mainUrl, newObject)
  return (
    request
    .then(response => response.data)
    .catch(error => {
      console.log('error', error)
    }))
}

const update = (id, newObject) => {
  const request = axios.put(`${mainUrl}/${id}`, newObject)
  return (
    request
    .then(response => response.data)
    .catch(error => {
      console.log('error', error)
    }))
}

const deleteContact = (id) => {
  const request = axios.delete(`${mainUrl}/${id}`)
  return (
    request
    .then(response => response.data)
    .catch(error => {
      console.log('error', error)
    }))
}

export default {getAll: getAll, create: create, update: update, deleteContact: deleteContact, mainUrl: mainUrl}
