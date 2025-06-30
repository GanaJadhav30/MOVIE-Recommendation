import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Cards = ({title}) =>{
  return <h2>{title}</h2>
}

const App = () =>{
  return <div>
     <h2>Arrow Function</h2>
      <Cards  title='spiderman'/>
      <Cards title='batman' />
      <Cards title='superman' />
  </div>
}

export default App
