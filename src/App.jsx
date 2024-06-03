import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";
const key = `26eb3b87752360c23563b3ef61c1db0d`;

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const { lat, lon } = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      axios
        .get(url)
        .then((res) => {
          const kel = res.data.main.temp,
            cel = (kel - 273.15).toFixed(2),
            fah = ((cel * 9) / 5 + 32).toFixed(2);
          setTemp({ cel: cel, fah: fah });
          setWeather(res.data);
        })

        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        });
    }
  }, [coords]);

  return (
    <article className="app">
      {isLoading ? (
        <figure className="loading">
          <img
            src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952bcb00wwpym54nppu76z7dwv1jfuomltjg7qncpuh&ep=v1_gifs_search&rid=200w.gif&ct=g"
            alt="is_loading"
          />
        </figure>
      ) : (
        <WeatherCard weather={weather} temp={temp} />
      )}
    </article>
  );
}

export default App;
