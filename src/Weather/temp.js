import React, { useEffect, useState, useRef } from 'react'
import "./style.css"
import Weathercard from './weathercard'

const Temp = () => {
  const [searchValue, setSearchValue] = useState("punjab");
  const [tempInfo, setTempInfo] = useState({});
  const [errMsg, setErrorMsg] = useState(null);
  const searchBtnRef = useRef(null);
  const [serachTrigger, setSearchTrigger] = useState(false)
  const getWeatherInfo = () => {
    try {
      // setErrorMsg(null);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=bc31cf2391965a913f0b56e9d4559cc2`
      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(data => {
          const { main: { temp, humidity, pressure },
            weather: [{ main }],
            wind: { speed }, name,
            sys: { country, sunset } } = data


          const myNewWeatherInfo = {
            temp,
            humidity,
            pressure,
            weatherMood: main,
            speed,
            name,
            country,
            sunset
          };

          setTempInfo(myNewWeatherInfo);
          console.log(name);
          console.log(temp);
        })
        .catch(err => {

          setErrorMsg(err.message)
        })

    } catch (err) {

      setErrorMsg(err.message)
    }










  };

  useEffect(() => {

    getWeatherInfo();
  }, [serachTrigger])


  return (
    <>

      <div className="wrap">
        <div className="search">
          {/* {
            errMsg != null ? <h1>{errMsg}</h1> : ""
          } */}
          <input type="search"
            placeholder='Search...'
            autoFocus
            id='search'
            ref={searchBtnRef}
            className='searchTerm'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button className='searchButton' type='button' r
            onClick={() => {
              setSearchTrigger(!serachTrigger)
              searchBtnRef.current.focus();
            }}>Search</button>

        </div>
      </div>
      <Weathercard tempInfo={tempInfo} />

    </>
  )
}

export default Temp

