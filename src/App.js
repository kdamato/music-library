import { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'


function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    useEffect(() => {
      const fetchData = async() =>{
        document.title = `${search} Music`
        const response = await fetch('https://itunes.apple.com/search?term=the%20grateful%20dead')
        const resData = await response.json()
        if (resData.results.length > 0){
          setData(resData.results)
        } else {
          setMessage('No Results Found')
        }
      }
        fetchData()
      })

    return (
        <div>
            <SearchBar />
            {message}
            <DataContext.Provider value={data}>
              <Gallery />
            </DataContext.Provider>
        </div>
    )
}

export default App

