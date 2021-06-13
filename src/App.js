import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import BanksService from './services/BanksService';
import Dropdown from './components/Dropdown';
import Header from './components/Header'
import BanksTable from './components/BanksTable';
import Favorites from './components/Favorites'

const cityOptions = [
  { label: "Bangalore", value: "BANGALORE" },
  { label: "Mumbai", value: "MUMBAI" },
  { label: "Chennai", value: "CHENNAI" },
  { label: "Kolkata", value: "KOLKATA" },
  { label: "Delhi", value: "DELHI" },
]
  ;
const App = () => {
  const [city, setCity] = useState('BANGALORE')
  const [banks, setBanks] = useState([])
  const [favorites, setFavorites] = BanksService.FavoritesWithLocalStorage('six')
  // const [response, setResponse] = BanksService.ResponseCache('response')

  const handleFav = (event) => {
    var favIFSC = event.target.value
    var favBankarr = banks.filter((val) => favIFSC === val.ifsc)
    console.log(favBankarr);
    var favBank = favBankarr[0] || ''
    // console.log(favBank);
    if (favBank)
      setFavorites([...favorites, favBank])

    if (favorites && favorites.length > 0) {
      favorites.forEach((val, index) => {
        if (val.ifsc === favBank.ifsc) {
          console.log('equal', index);
          favorites.splice(index, 1)
          console.log(favorites);
          setFavorites([...favorites])
          return
        }
      }) 
    }
    else {
      setFavorites([...favorites, favBank])
    }
    // console.log(favorites)
  }

  var favoritesIFSC = favorites.map((value) => value.ifsc)
	// console.log(favoritesIFSC)
  
  const removeFav = (event) => {
    console.log(event.target.value)
    if (favorites && favorites.length > 0) {
      favorites.forEach((val, index) => {
        if (val.ifsc === event.target.value) {
          console.log('Remove favorite', index);
          favorites.splice(index, 1)
          console.log(favorites);
          setFavorites([...favorites])
          return
        }
      }) 
    }
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
    console.log(city)
  }


  useEffect(() => {
    BanksService
      .GetBanksFromApi({ city })
      .then(result => setBanks(result))
      .catch(error => {
        alert('Api call unsuccessful')
      })
  },[city])


  return (
    <Router>
      <Header />
      <div className="App">
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <Dropdown city={city} handleCityChange={handleCityChange} cityOptions={cityOptions} />
              <BanksTable Banks={banks} handleFav={handleFav} favoritesIFSC={favoritesIFSC} />

            </>
          )}
        />
        <Route
          path="/favorites"
          render={(props) => (
            <>
              <Favorites favorites={favorites} removeFav={removeFav} />
            </>
          )}
        />
      </div>
    </Router>
  );
}

export default App;
