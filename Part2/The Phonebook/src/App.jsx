import { useState, useEffect } from 'react'
import {Notification, ErrorNotification} from './components/Notification'
import personService from './services/persons'


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

const Persons = ({persons, searchItem, onClick}) => {
  return(
  <div>
        {persons
        .filter(person => person && person.name && person.name.toLowerCase().includes(searchItem.toLowerCase()))
        .map(person => (
        <div key={person.name}>
        {person.name} {person.number} &nbsp;
        <button onClick={() => onClick(person.id)}>Delete</button>
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
  const [addNotif, setAddNotif] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect (() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log('success! getAll')
      })
      .catch(error => {
        console.log('fail getAll')
      })
    },[])

  const newPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
    }
      
      if (persons.find(person => person.name === newName && person.number === newNumber)) {
        alert(`${newName} is already added to phonebook`)

      } else if(persons.find(person => person.name === newName &&
                                       person.number !== newNumber)) {
        if(window.confirm(`${newObject.name} is already added to phonebook, replace the old number with a new one?`)){                         
        const pId = persons.find(p => p.name === newObject.name).id
        const changedNumber = {name: newObject.name, number: newObject.number}

        personService
        .update(pId, changedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(p => (p.id === pId ? returnedPerson : p)))
        })
        .catch(error => {
          setErrorMessage(`Information of ${newObject.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
      } else {
        console.log('Number replacement has been cancelled')
      }

      }else {
      personService
        .create(newObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setAddNotif(`Added ${newObject.name}`)
        setTimeout(() => {
          setAddNotif(null)
        },5000)
        console.log('Success! create')          
    })
    .catch(error => {
      console.log('fail create')
    }) 
      }

    setNewName('')
    setNewNumber('')

  }

  const deleteName = (id) => {
    console.log(`${personService.mainUrl}/${id}`)
    const personToDelete = persons.find(person => person.id === id)
    
    if(window.confirm(`Delete ${personToDelete.name}?`)){
    personService
    .deleteContact(id)
    .then(Response => {
      personService.getAll()
      .then (response => {
        setPersons(response)
      })
      console.log(`${personToDelete.name} is just deleted`)
    })
    .catch(error => {
      console.error("Error: ", error)
    })
  }
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
      <ErrorNotification message={errorMessage} />
      <Notification message={addNotif} />
      <Filter value={searchItem} onChange={searchHandler} />
      <h3>Add a new</h3>
      <PersonForm onSubmit = {newPerson}
            nameValue = {newName}
            nameHandler = {newNameHandler}
            numberValue = {newNumber}
            numberHandler = {newNumberHandler}
            />
      <h3>Numbers</h3>
      <Persons persons = {persons}
               searchItem = {searchItem}
               onClick={deleteName} />     
    </div>
  )
}

export default App