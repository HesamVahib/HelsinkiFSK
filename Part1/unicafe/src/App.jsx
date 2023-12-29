import {useState} from 'react'

const StatisticLine = ({text, value}) =>{
  return (
    <tr>
     <td>{text}</td>
     <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) =>{
  if (props.good === 0 && props.neutral === 0 && props.bad === 0)
  return (
    <p>No feedback given</p>
    )
  return(
    <div>
      <table>
      <tbody>
        <StatisticLine text ='good' value ={props.good} />
        <StatisticLine text ='neutral' value ={props.neutral} />
        <StatisticLine text ='bad' value ={props.bad} />
        <StatisticLine text ='all' value ={props.good+props.neutral+props.bad} />
        <StatisticLine text ='average' value ={Math.round(((props.good-props.bad)/(props.good+props.neutral+props.bad))*10)/10} />
        <StatisticLine text ='positive' value ={Math.round((props.good*100)/(props.good+props.neutral+props.bad)*10)/10 + '%'} />
      </tbody>
      </table>
    </div>
  )

}

const Button = ({onTap,buttonValue}) =>{
  return(
    <button onClick={onTap}>{buttonValue}</button>
  )
}
  

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (

    <div>
      <h1>give feedback</h1>
      <Button onTap = {() => setGood (good + 1)} buttonValue='good' />
      <Button onTap = {() => setNeutral(neutral + 1)} buttonValue='neutral' />
      <Button onTap = {() => setBad(bad + 1)} buttonValue='bad' />
      <h1>statistics</h1>
      <Statistics good={good}
        neutral={neutral}
        bad={bad} />
    </div>
  )
}

export default App

