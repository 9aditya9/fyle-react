import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react';
import BanksService from './services/BanksService';
import Dropdown from './components/Dropdown';
import Header from './components/Header'
import BanksTable from './components/BanksTable';
import Favorites from './components/Favorites'
import ViewBanks from './components/ViewBanks';

const cityOptions = [
  { label: "Bangalore", value: "BANGALORE" },
  { label: "Mumbai", value: "MUMBAI" },
  { label: "Chennai", value: "CHENNAI" },
  { label: "Kolkata", value: "KOLKATA" },
  { label: "Delhi", value: "DELHI" },
];

const App = () => {
  const [city, setCity] = useState('BANGALORE')
  const [banks, setBanks] = useState([])
  const [favorites, setFavorites] = BanksService.FavoritesWithLocalStorage('favorites')
  const [response, setResponse] = BanksService.ResponseCache('response')

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
          // console.log('equal', index);
          favorites.splice(index, 1)
          // console.log(favorites);
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
    // BanksService
    //   .GetBanksFromApi({ city })
    //   .then(result => setBanks(result))
    //   .catch(error => {
    //     alert('Api call unsuccessful')
    //   })
    //   console.log(banks);
    var url = '/autocomplete?q=' + city
    if (response[url]) {
      console.log(response[url])
      var data = response[url]
      setBanks(data.result)
      console.log('response caching working')
      return
    }
    else {
      const result = BanksService.GetBanksFromApi({ city })
      // console.log(result)
      // console.log('api is working fine');
      result.then(res => {
        // console.log(res)
        response[url] = res
        // console.log(response);
        setResponse({ ...response })
        // console.log(response)
        setBanks(res.result)
        // console.log(url)
      })
    }
    // console.log(banks)
  }, [city])


  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route
            path="/fyle-react"
            exact
            render={(props) => (
              <>
                <Dropdown city={city} handleCityChange={handleCityChange} cityOptions={cityOptions} />
                <BanksTable Banks={banks} handleFav={handleFav} favoritesIFSC={favoritesIFSC} />

              </>
            )}
          />
          <Route
            path="/fyle-react/favorites"
            exact
            render={(props) => (
              <>
                <Favorites favorites={favorites} removeFav={removeFav} />
              </>
            )}
          />
          <Route
            path="/fyle-react/banks/:banksid"
            exact
            render={(props) => (
              <>
                <ViewBanks Banks={banks} banksid={props.match.params.banksid} />
              </>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
