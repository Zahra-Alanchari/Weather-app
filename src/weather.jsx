import Day from "./day";

export default function Weather({ weather, location }) {

  const dayes = weather.time;
  
  return (
    <div>
      <h2>weather {location}</h2>
      <ul className="weather">
        {dayes.map((day, i) => (
          <Day
            date={day}
            max={weather.temperature_2m_max[i]}
            min={weather.temperature_2m_min[i]}
            code={weather.weathercode[i]}
            key={day}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}
