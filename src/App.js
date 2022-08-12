import { useEffect, useState, Fragment, useRef, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

function App() {
	let searchInput = useRef('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	// useEffect(() => {
	// 	if(search) {
	// 		const fetchData = async () => {
	// 			document.title = `${search} Music`
	// 			const response = await fetch(API_URL + search)
	// 			const resData = await response.json()
	// 			if (resData.results.length > 0) {
	// 				return setData(resData.results)
	// 			} else {
	// 				return setMessage('Not Found')
	// 			}
	// 		}
	// 		fetchData()
	// 	}
	// }, [search])
	const showGallery = () => {
		if(data) {
			return (
				<Suspense>
					<Gallery />
				</Suspense>
			)
		}
	}
	
	const handleSearch = (e, term) => {
        e.preventDefault()
        // Fetch Data
        const fetchData = async () => {
            document.title = `${term} Music`
            const response = await fetch(API_URL + term)
            const resData = await response.json()
            if (resData.results.length > 0) {
                // Set State and Context value
                return setData(resData.results)
            } else {
                return setMessage('Not Found')
            }
        }
        fetchData()
    }

	return (
		<div>
			{message}
			<Router>
				<Routes>
					<Route path="/" element={
						<Fragment>
							<SearchBar handleSearch = {handleSearch}/>
							<Gallery data={data} />
						</Fragment>
					} />
					<Route path="/album/:id" element={<AlbumView />} />
					<Route path="/artist/:id" element={<ArtistView />} />
				</Routes>
			</Router>
		</div>
  	);
}

export default App;