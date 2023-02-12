import axios from "axios";

const API_KEY = "c4fa362f9949bfee4e61d2556eb7f2ba";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getWeatherData = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const data = await axios.get(URL)
    .then((res) => res.data)

  const {
    weather,
    main: { temp, temp_min, temp_max },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    temp_min,
    temp_max,
    speed,
    country,
    name,
  };
};

export { getWeatherData };
