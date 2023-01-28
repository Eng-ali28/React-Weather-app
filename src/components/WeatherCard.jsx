import React from "react";
import {
  WiDaySunnyOvercast,
  WiDaySunny,
  WiDaySnowWind,
  WiCloudy,
  WiDayRainMix,
} from "react-icons/wi";
const WeatherCard = ({ data: { conditions, datetime, maxt, mint } }) => {
  const time = new Date(datetime);
  const date = time.toLocaleDateString();
  const day = time.toDateString().substring(0, 3);
  let icon;
  switch (conditions.split(" ")[0]) {
    case "Partially":
      icon = <WiDaySunnyOvercast size="3.5rem" className="text-gray-500" />;
      break;
    case "Clear":
      icon = <WiDaySunny size="3.5rem" className="text-yellow-400" />;
      break;
    case "Overcast":
      icon = <WiCloudy size="3.5rem" className="text-slate-400" />;
      break;
    case "Snow,":
      icon = <WiDaySnowWind size="3.5rem" className="text-green-200" />;
      break;
    case "Rain,":
    case "Rain":
      icon = <WiDayRainMix size="3.5rem" className="text-slate-400" />;
      break;
    default:
      icon = <WiDaySunnyOvercast size="3.5rem" />;
  }
  return (
    <div className="flex flex-col items-center justify-center p-4 w-[280px] shadow-md shadow-indigo-500/40 space-y-2 border border-violet-500 rounded-[12px] text-violet-500">
      <div className="flex space-x-2">
        <h1>{day}</h1>
        <h3>{date}</h3>
      </div>
      <div>{icon}</div>
      <div>
        <table className="table-auto">
          <tr>
            <th>Weather: </th>
            <td>{conditions}</td>
          </tr>
          <tr>
            <th className="text-start">Temp: </th>
            <td>
              {maxt} - {mint}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default WeatherCard;
