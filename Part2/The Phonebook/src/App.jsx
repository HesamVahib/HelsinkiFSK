import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return(
  <div>
    filter shown with <input value={value}
        onChange={onChange}/>
  </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.onSubmit}>
      <div>
          name: <input value={props.nameValue}
          onChange={props.nameHandler}/>
        </div>
        <div>
          number: <input value={props.numberValue}
          onChange={props.numberHandler}/>
        </div>
        <div>
          <button type="submit"> add </button>
        </div>
    </form>
  )
}

const Persons = ({persons, searchItem}) => {
  return(
  <div>
        {persons
        .filter(person => person.name.toLowerCase().includes(searchItem.toLowerCase()))
        .map(person => (
        <div key={person.name}>
        {person.name} {person.number}
        </div>
        ))}
      </div> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')

  useEffect (() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const newPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
    }
      if (persons.find(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat(newObject))
      }

    setNewName('')
    setNewNumber('')

  }

  const newNameHandler = (event) => {
    setNewName(event.target.value)
  }
  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const searchHandler = (event) => {
    setSearchItem(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchItem} onChange={searchHandler} />
      <h3>Add a new</h3>
      <PersonForm onSubmit = {newPerson}
            nameValue = {newName}
            nameHandler = {newNameHandler}
            numberValue = {newNumber}
            numberHandler = {newNumberHandler}
            />
      <h3>Numbers</h3>
      <Persons persons = {persons} searchItem = {searchItem} />     
    </div>
  )
}

export default App