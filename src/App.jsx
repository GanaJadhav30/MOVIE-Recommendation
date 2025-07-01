import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search'

// const Cards = ({title}) =>{
//   const [hasLiked, sethasLiked] = useState(false)
//   return <div>
//     <h2>{title}</h2>
//     <button onClick={()=>{sethasLiked(!hasLiked)}}>{hasLiked ? 'Liked' : 'like'}</button>
//   </div>
// }

const App = () =>{

   const [searchTerm, setsearchTerm] = useState('')

  return <main>
     <div className='pattern'> 
       <div className='wrapper'>
          <header>
            <img src="./hero.png" alt="Hero banner" />
           <h1><span className='text-gradient'>Find Movies</span> You'll Enjoy  Without Any Hassel</h1>
           </header>
           <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
           <h1 className='text-white text-2xl'>{searchTerm}</h1>
          
        </div>
     </div>

  </main> 
  
}

export default App
