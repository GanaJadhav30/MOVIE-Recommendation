import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import {useDebounce} from 'react-use'



const API_BASE_URL = 'https://api.themoviedb.org/3' 

const API_KEYS = import.meta.env.VITE_TMDB_API_KEYS

const API_OPTIONS= {
   method:'get',
   headers:{
      accept:'application/json',
      Authorization:`Bearer ${API_KEYS}`
   }
}

const App = () =>{

   const [searchTerm, setsearchTerm] = useState('')
   const [fetchingError, setfetchingError] = useState('')
   const [movieList, setmovieList] = useState([])
   const [isLoading, setisLoading] = useState(false)
   const [debounceSearch, setdebounceSearch] = useState('')

   useDebounce(()=>setdebounceSearch(searchTerm),500,[searchTerm])

   const fetchMovies = async (query='') =>{

      setisLoading(true)
      setfetchingError('')
      try {

         const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`   : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
         const response = await fetch(endpoint,API_OPTIONS)

         if(!response.ok){
            throw new Error("Failed to load movies");
            
         }

         const data = await response.json();
         console.log(data.results)

         if(data.Response ==="False"){
            setfetchingError(data.Error || 'failed to fetch movies')
            setmovieList([])
            return
         }
         setmovieList(data.results || [])

      } catch (error) {
         console.log(`Fetching error :${error}`)
         setfetchingError("Error fetching movies please try agains")
      } finally{
         setisLoading(false)
      }
   }
   useEffect(() => {
      fetchMovies(debounceSearch)
   }, [debounceSearch])
   

  return <main>
     <div className='pattern'> 
       <div className='wrapper'>
          <header>
            <img src="./hero.png" alt="Hero banner" />
           <h1><span className='text-gradient'>Find Movies</span> You'll Enjoy  Without Any Hassel</h1>
           <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
           </header>
           
           <section className='all-movies'>
            <h2>All movies</h2>

            {isLoading ? (<Spinner />
            ):fetchingError ? (
               <p>{fetchingError}</p>
            ):(
               <ul>
                  {movieList.map((movie)=>(
                  <MovieCard key={movie.id} movie={movie} />
               ))}
               </ul>)}

           </section>
          
        </div>
     </div>

  </main> 
  
}

export default App
