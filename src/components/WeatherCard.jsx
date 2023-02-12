import "../App.css";
import React, { useState, useEffect } from "react";
import { getWeatherData } from "./getWeather";

const WeatherCard = () => {
  const [value, setValue] = useState("");
  const [city, setCity] = useState("Yerevan");
  const [weather, setWeather] = useState(null);

  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city);
      setWeather(data);
    };
    fetchWeatherData();
  }, [city]);

  const handleUnitsClick = () => {
    setCity(value);
    setValue("");
  };
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      setValue("");
    }
  };


  return (
    <>
      <section className="vh-100 bg-secondary">
        <div className="container py-5 h-100">
          <div className="d-flex justify-content-center align-items-center mb-1">
            <div className="inputbox">
              <div>
                <label for="inp" class="inp">
                  <input
                    type="text"
                    id="inp"
                    placeholder="&nbsp;"
                    onKeyDown={enterKeyPressed}
                    name="city"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  />
                  <span class="label">Enter City...</span>
                  <span class="focus-bg"></span>
                </label>
              </div>
              <div>
                <button onClick={handleUnitsClick} className="button-28">Search</button>
              </div>
            </div>
          </div>
          {weather && (
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 col-lg-6 col-xl-4">
                <div className="card bg-light" style={{ borderRadius: "35px"  }}>
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <h6 className="flex-grow-1">{`${weather.name}, ${weather.country}`}</h6>
                      <h6>{time}</h6>
                    </div>

                    <div className="d-flex flex-column text-center mt-5 mb-4">
                      <h6 className="display-4 mb-0 font-weight-bold">
                        {weather.temp.toFixed()}°C{" "}
                      </h6>
                      <span className="small text-secondary">
                        {weather.description}
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 fs-6">
                        <div>
                          <i className="fas fa-wind fa-fw text-secondary"></i>
                          <span className="fs-6">
                            {" "}
                            {weather.speed.toFixed()}km/h
                          </span>
                        </div>
                        <div>
                          <i className="fas fa-tint fa-fw text-secondary"></i>
                          <span className="fs-6"> {weather.humidity}% </span>
                        </div>
                        <div>
                          <i className="fas fa-arrow-up text-secondary"></i>
                          <span className="fs-6">
                            {weather.temp_max.toFixed()}°C{" "}
                          </span>
                        </div>
                        <div>
                          <i className="fas fa-arrow-down text-secondary"></i>
                          <span className="fs-6">
                            {weather.temp_min.toFixed()}°C{" "}
                          </span>
                        </div>
                      </div>
                      <div>
                        <img src={weather.iconURL} alt="weatherIcon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WeatherCard;
