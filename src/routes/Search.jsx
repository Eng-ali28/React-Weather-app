import React, { useState, useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { WeatherCard } from "../components";
const Search = () => {
  const [country, setCountry] = useState(null);
  const [currentcountry, setCurrentCountry] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const inpRef = useRef();
  let baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${country}&aggregateHours=24&unitGroup=uk&shortColumnNames=false&contentType=json&key=3XERXJ6EGTZBJYZVJKWCM2GXH`;
  function changeInp(e) {
    e.preventDefault();
    if (!inpRef.current.value) return;
    setCountry(inpRef.current.value);
    inpRef.current.value = "";
  }
  useEffect(() => {
    inpRef.current.focus();
    document.title = "Search";
  }, []);
  function selectFields(data) {
    if (!Array.isArray(data)) return;
    return data.map((obj) => {
      let { datetime, maxt, mint, conditions } = obj;
      return { datetime, maxt, mint, conditions };
    });
  }
  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (!country) return;
        const response = await fetch(baseUrl);
        const jsonData = await response.json();
        if (jsonData.message != null) {
          throw new Error(jsonData.message);
        } else {
          setError("");
        }
        const { locations } = jsonData;
        if (locations) setCurrentCountry(locations[country].address);
        setData(selectFields(locations[country].values));
      } catch (error) {
        console.log(error);
        setError(error.toString().substring(7) || "there are error");
        setData([]);
        setCountry(null);
        setCurrentCountry("");
      }
    };
    fetchApi();
  }, [country]);
  const weathers = data.map((data, ind) => {
    return (
      <div key={ind}>
        <WeatherCard data={data} />
      </div>
    );
  });
  return (
    <div className="p-2">
      <form className="w-[380px] max-w-full m-auto" onSubmit={changeInp}>
        <div className=" bg-slate-100 text-violet-500 text-[18px] rounded-md py-2 px-4 w-[350px] max-w-full flex items-center justify-between">
          <input
            type="text"
            className="outline-none bg-transparent placeholder:text-violet-400 placeholder:text-[18px] w-[75%]"
            placeholder="search with specific country"
            dir="auto"
            ref={inpRef}
          />
          <button
            type="submit"
            className="w-[18%] text-center py-2 px-3 bg-violet-600/80 text-white rounded-md "
          >
            <BsSearch size={"1.6rem"} />
          </button>
        </div>
      </form>
      <div className="relative">
        {!error && data.length == 0 && (
          <h1 className="text-violet-500 text-center py-4 font-bold">
            Enter your specific country
          </h1>
        )}
        {error && (
          <h1 className="p-2 text-center text-rose-800 font-bold">{error}</h1>
        )}
        {country && (
          <div className="py-4 text-violet-500 text-[20px] font-bold text-center">
            Your result about:{" "}
            <span className="bg-violet-500 px-3 py-1 text-white rounded-md capitalize ">
              {currentcountry}
            </span>
          </div>
        )}
        {data.length == 0 && country != null ? (
          <h1 className="animate-ping absolute -translate-x-1/2 left-1/2 text-[16px] w-fit  text-violet-500">
            Loading...
          </h1>
        ) : (
          <div className="flex flex-col p-4 sm:flex-row sm:flex-wrap items-center justify-center gap-[10px]">
            {weathers}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
