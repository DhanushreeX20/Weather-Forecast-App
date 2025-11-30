import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Weather-dependent Tailwind gradient classes
  const getBackground = () => {

    if (weather.includes("Rain")) return "from-black via-blue-950 to-black";
    if (weather.includes("Cloud")) return "from-gray-900 via-blue-700 to-grey-800 ,";
    if (weather.includes("Clear")) return "from-yellow-300 via-blue-400 to-green-300";
     if (weather.includes("Drizzle")) return "from-gray-900 via-sky-400 to-black";
         if (weather.includes("Smoke")) return "from-gray-900 via-black-400 to-black";
    return "from-yellow-300 via-indigo-500 to-orange-400";
  };

  // Weather icons
  const weatherIcons = {
    Clear: "https://img.icons8.com/?size=96&id=19541&format=png",        
    Clouds: "https://img.icons8.com/color/96/000000/cloud.png ",           
    Rain: "https://img.icons8.com/color/96/000000/rain.png",             
    Drizzle: "https://img.icons8.com/color/96/000000/light-rain.png",    
    Storm: "https://img.icons8.com/color/96/000000/storm.png",         
    Snow: "https://img.icons8.com/color/96/000000/snow.png",             
    Fog: "https://img.icons8.com/?size=96&id=0Uw1gKHf7GqR&format=gif&color=f7f7f7", 
    Haze: "https://img.icons8.com/color/96/000000/fog-day.png",         
    Mist: "https://img.icons8.com/?size=160&id=iLpjwANFLM5s&format=png",          
    Smoke: "https://img.icons8.com/?size=96&id=BncPMNznpkES&format=png",     
    Dust: "https://img.icons8.com/?size=60&id=90WHVYAKL4h5&format=png",        
  };

  function getWeather() {
    if (!city) return; // prevent empty search
    setLoading(true);
    setError("");

    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3af45033e0814324e068644f4b6c23be&units=metric`
    )
      .then((res) => {
        setWeather(res.data.weather[0].main);
        setDesc(res.data.weather[0].description);
        setTemp(res.data.main.temp);
      })
      .catch(() => {
        setError("City not found");
        setWeather("");
        setTemp("");
        setDesc("");
      })
      .finally(() => setLoading(false));
  }


  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center transition-all duration-700`}
      style={{
        backgroundImage: `url(https://c.pxhere.com/photos/88/4c/mountain_blue_hill_peak-13688.jpg!d)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gradient if weather is available */}
        {weather && !error && (
        <div className={`absolute inset-0 bg-gradient-to-br ${getBackground()} opacity-40`}></div>
      )}

      <div className="flex flex-col items-center justify-center w-full p-5 text-white z-10 relative">
        <h1 className="text-5xl font-bold font-serif mb-5 flex items-center z-10">
       Clim8
          <img
            src="https://img.icons8.com/?size=160&id=L2Fd0CmW04F0&format=png"
            className="w-10 ml-2"
          />
        </h1>

        <p className="text-center font-mono text-gray-200 mb-6">
        Your personal Weather Window App !
        </p>

        {/* Search Input */}
        <div className="flex items-center gap-3 mb-4 w-full max-w-md">
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-white/60 outline-none"
          />
          <button
            onClick={getWeather}
            className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Go
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="animate-pulse text-center py-10">
            <div className="h-6 bg-white/20 w-1/2 mx-auto rounded mb-4"></div>
            <div className="h-12 bg-white/20 w-1/3 mx-auto rounded mb-4"></div>
            <div className="h-6 bg-white/20 w-1/4 mx-auto rounded mb-4"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center mt-6 animate-fadeIn">
            <div className="bg-red-400 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20">
              <div className="text-red-500 text-3xl mb-2 drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                ⚠️
              </div>
              <h2 className="text-2xl font-semibold font-mono mb-2">City Not Found</h2>
              <p className="text-gray-800 ">
                We couldn’t find <span className="font-bold text-white">"{city}"</span>.  
                Please try a different city.
              </p>
              <button
                onClick={() => setError("")}
                className="mt-4 bg-white/20 px-5 py-2 rounded-xl hover:bg-white/30 transition font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {!loading && !error && weather && (
          <div className="text-center animate-fadeIn relative z-20">
            <img
              src={weatherIcons[weather] || weatherIcons["Clear"]}
              alt={weather}
              className="w-32 mx-auto drop-shadow-lg transition-transform duration-500 hover:scale-110"
            />
            <h1 className="text-6xl font-bold mb-2">{temp}°C</h1>
            <h2 className="text-3xl font-medium mb-1">{weather}</h2>
            <p className="capitalize text-gray-300 mb-4">{desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
