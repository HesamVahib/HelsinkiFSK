import { useState } from 'react'

const Button = ({onTap, text}) => {
  return <button onClick={onTap}>{text}</button>
}

const Display = ({text, tag}) => {
    const Tag = tag || 'p';
    return <Tag>{text}</Tag>
};

const MostVoted = (props) => {
  const maxVoted = Math.max(...props.votes)
  const indexOfMax = props.votes.indexOf(maxVoted)
  const largestAnecdotes = props.anecdotes[indexOfMax]

  return <div> {maxVoted === 0 ?
    (<Display text = "you have not voted yet" />
   ) : (
    <>
    <Display text = {largestAnecdotes}/>
    <Display text = {`has ${maxVoted} votes`} />
    </>
    )} </div>
  };

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState( new Array(anecdotes.length).fill(0))

  const randomNumber = () => {
    const random = Math.floor(Math.random()*anecdotes.length)
    setSelected(random)
  }

  const voteHandler = () =>{
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Display text ="Anecdote of the day" tag = 'h1'/>
      <Display text = {anecdotes[selected]} />
      <Display text = {`has ${votes[selected]} votes`} />
      <Button onTap={voteHandler} text ='vote' />
      <Button onTap={randomNumber} text ='next anecdote' />
      <Display text = "Anecdote with most votes" tag = 'h1'/>
      <MostVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App;
