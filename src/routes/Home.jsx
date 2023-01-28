import React, { useState, useEffect } from "react";
import { WeatherCard } from "../components";
const Home = () => {
  const [weather, setWeather] = useState([]);
  const baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast";
  function getSpecificfields(obj) {
    const { conditions, datetime, maxt, mint } = obj;
    return { conditions, datetime, maxt, mint };
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        document.title = "HC-Syria";
        const response = await fetch(
          `${baseUrl}?locations=syria&aggregateHours=24&unitGroup=uk&shortColumnNames=false&contentType=json&key=3XERXJ6EGTZBJYZVJKWCM2GXH`
        );
        const { locations } = await response.json();
        const {
          syria: { values },
        } = locations;
        const newValues = values.map((ele) => getSpecificfields(ele));
        setWeather(newValues);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="px-4 py-5">
      <ul className="flex items-center justify-center gap-4 flex-wrap">
        {weather.length > 0 ? (
          weather.map((ele, ind) => (
            <li key={ind}>
              <WeatherCard data={ele} />
            </li>
          ))
        ) : (
          <li className="text-[40px] text-violet-500 text-center animate-ping">
            Loading ...
          </li>
        )}
      </ul>
    </div>
  );
};

export default Home;
