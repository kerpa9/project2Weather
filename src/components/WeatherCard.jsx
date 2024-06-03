import { useState } from "react";
import "./styles/weatherCard.css";
const WeatherCard = ({ weather, temp }) => {
  console.log(weather);

  const [isCel, setIsCel] = useState(true);

  const handleTemp = () => {
    setIsCel(!isCel);
  };

  return (
    <>
      <img
        className="font_img"
        src={`../assets/${weather?.weather[0].icon}.gif `}
        alt="font_img"
      />
      <div className="weathercard">
        <h1 className="weathercard_title">weather app</h1>
        <h2 className="weathercard_city">
          {weather?.name}, {weather?.sys.country}
        </h2>
        <section className="weathercard_body">
          <figure className="weathercard_img">
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
              alt="weather image"
            />
          </figure>
          <article className="weathercard_data">
            <h3 className="weathercard_description">
              {weather?.weather[0].description}
            </h3>

            <ul className="weathercard_list">
              <li className="weathercard_item">
                <span>wind speed </span>
                <span>{weather?.wind.speed} m/s</span>
              </li>
              <li className="weathercard_item">
                <span>clouds</span>
                <span>{weather?.clouds.all}%</span>
              </li>
              <li className="weathercard_item">
                <span>pressure </span>
                <span>{weather?.main.pressure} hPa</span>
              </li>
            </ul>
          </article>
        </section>
        <h2 className="weathercard_temp">
          {isCel ? temp?.cel + " °C" : temp?.fah + " °F"}
        </h2>

        <button className="weathercard_btn" onClick={handleTemp}>
          Change to {isCel ? " °F" : " °C"}
        </button>
      </div>
    </>
  );
};

export default WeatherCard;
