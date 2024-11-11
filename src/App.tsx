import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AppSidebar from "./components/Sidebar";
import axios from "axios";
import MarkOptimization from "./components/Line";
import RadarChart from "./components/Radar-chart";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const THINGSPEAK_API_KEY = import.meta.env.VITE_THINGSPEAK_API;
// import { useFetchOneData } from "./hooks/fetchData";

function App() {
  const [air, setAir] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select City");

  interface DataItem {
    date: string;
    temperature: number;
    altitude: number;
    pressure: number;
    humidity: number;
    air: number;
    _id: string;
    city: string;
  }

  const [data, setData] = useState<DataItem[]>([]);

  const formattedDates = data.map((item) => {
    const date = new Date(item.date);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
    const month = String(date.getMonth()).padStart(2, "0"); // Ensure 2-digit month
    return `${day}/${month}`;
  });

  const getData = () => {
    setLoading(true);
    axios
      .get(
        THINGSPEAK_API_KEY
      )
      .then((response) => {
        // console.log(response.data);

        // const _id = response.data.feeds[0]._id.toString();
        const air = parseFloat(
          parseFloat(response.data.feeds[0].field1).toFixed(2)
        );
        const humidity = parseFloat(
          parseFloat(response.data.feeds[0].field2).toFixed(2)
        );
        const temperature = parseFloat(
          parseFloat(response.data.feeds[0].field3).toFixed(2)
        );
        const pressure = parseFloat(
          parseFloat(response.data.feeds[0].field4).toFixed(2)
        );
        const altitude = parseFloat(
          parseFloat(response.data.feeds[0].field5).toFixed(2)
        );

        // Update state with parsed values
        setAir(air);
        setHumidity(humidity);
        setTemperature(temperature);
        setPressure(pressure);
        setAltitude(altitude);

        // Post data to local server using local variables
        axios
          .post(`${SERVER_URL}/add`, {
            air: air,
            temperature: temperature,
            humidity: humidity,
            altitude: altitude,
            pressure: pressure,
            city: selectedCity,
          })
          .then((postResponse) => {
            console.log("Data posted successfully:", postResponse.data);
          })
          .catch((postError) => {
            console.error("Error posting data:", postError);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // // const history = () => {};
  // // console.log(history);
  useEffect(() => {
    const animateValues = async () => {
      // Temporary variables to store values
      let temp, alt, pres, hum;
  
      // Increment loop from 0 to 100
      for (let i = 0; i <= 100; i++) {
        temp = alt = pres = hum = i;
      }
  
      // Decrement loop from 100 to 0
      for (let i = 100; i >= 0; i--) {
        temp = alt = pres = hum = i;
      }
  
      // Set the final state after the loops are done
      setTemperature(temperature);
      setAltitude(altitude);
      setPressure(pressure);
      setHumidity(humidity);
  
      // Fetch data from server only after the loops are completed
      try {
        const response = await axios.get(`${SERVER_URL}/get`);
        const updatedData = response.data.map((item: DataItem) => ({
          ...item,
          city: "Bhopal", // Add city property to each item
        }));
        setData(updatedData);
        setData(response.data);
        setAir(response.data[0].air);
        setTemperature(response.data[0].temperature);
        setHumidity(response.data[0].humidity);
        setPressure(response.data[0].pressure);
        setAltitude(response.data[0].altitude);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Call the function to run once
    animateValues();
  }, []);
  

  const handleItemClick = (item: any) => {
    setItemLoading(true);

    // Reset all variables to 0 before fetching new data
    setAir(0);
    setTemperature(0);
    setHumidity(0);
    setPressure(0);
    setAltitude(0);

    // Add a delay of 2 seconds before fetching data
    setTimeout(() => {
      axios
        .get(`${SERVER_URL}/get/${item.url}`)
        .then((response) => {
          if (response.data) {
            console.log("Document found:", response.data);

            // Instantly update the variables after the delay
            setAir(response.data.air);
            setTemperature(response.data.temperature);
            setHumidity(response.data.humidity);
            setPressure(response.data.pressure);
            setAltitude(response.data.altitude);

            setItemLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching document:", error);
          setItemLoading(false);
        });
    }, 2000); // 2-second delay before fetching and updating values
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-fit flex flex-col ">
      <Navbar
        onSidebarToggle={toggleSidebar}
        getData={getData}
        loading={loading}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar
          isOpen={isSidebarOpen}
          data={data}
          onItemClick={handleItemClick}
        />

        <main className="ml-64 mt-16 h-fit p-8 flex flex-col items-center justify-start snap-y snap-mandatory ">
          {/* Section 1 */}
          <div className="flex justify-center gap-8 w-full pb-8 mt-10 snap-start">
            {/* First Div - Radar Chart */}
            <div className="flex justify-center items-center border border-r-2 rounded-xl h-80 w-1/2 p-4">
              <RadarChart
                data={data.slice(0, 5).map((item, index) => ({
                  subject: `${formattedDates[index]}`,
                  A: item.air,
                  B: item.humidity,
                  fullMark: 500,
                }))}
              />
            </div>

            {/* Second Div - Weather Info */}
            <div className="flex justify-center items-center border border-r-2 rounded-xl h-80 w-1/2 p-4">
              Carry an umbrella; it might rain heavily today.
            </div>
          </div>

          <div className="flex items-center justify-center mt-20">
            <div className="flex justify-center gap-10">
              <div className="border-white-100  ">
                <CircularProgressbar
                  minValue={0}
                  maxValue={100}
                  value={itemLoading ? 0 : temperature}
                  text={
                    itemLoading ? "Loading..." : `${temperature} % Humidity`
                  }
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                    pathColor: `url(#customGradient)`,
                  })}
                />
              </div>
              <div className="border-white-100 border-l border-r px-10">
                <CircularProgressbar
                  minValue={9000}
                  maxValue={151320}
                  value={itemLoading ? 0 : pressure}
                  text={itemLoading ? "Loading..." : `${pressure} Pa Pressure`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                    pathColor: `url(#customGradient)`,
                  })}
                />
              </div>
              <div className="border-white-100 border-r pr-10">
                <CircularProgressbar
                  minValue={0}
                  maxValue={10}
                  value={itemLoading ? 0 : Math.floor(altitude / 100)}
                  text={
                    itemLoading
                      ? "Loading..."
                      : `${Math.floor(altitude / 100)} m Altitude`
                  }
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                    pathColor: `url(#customGradient)`,
                  })}
                />
              </div>
              <div className="border-white-100">
                <CircularProgressbar
                  value={itemLoading ? 0 : humidity}
                  text={
                    itemLoading ? "Loading..." : `${humidity} °C Temperature`
                  }
                  minValue={20}
                  maxValue={50}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                    pathColor: `url(#customGradient)`,
                  })}
                />
              </div>
            </div>
          </div>
          {/* Section 2 */}
          {/* First Row */}
          <div className="flex justify-center gap-8 pb-8 pt-8 mt-20 snap-start">
            <div className="border-2 rounded-xl bg-[#d1d1d1] w-1/2 py-2 px-6 flex flex-col items-center justify-center">
              <MarkOptimization
                // dates={formattedDates.map((date) =>
                //   parseInt(date.split("/")[0], 10)
                // )}
                values={data.map((item) => parseFloat(item.altitude.toFixed(2)))}
              />
              <div className="text-2xl font-black text-black">
                Altitude
              </div>
            </div>
            <div className="border-2 rounded-xl bg-[#d1d1d1] w-1/2 p-4 flex flex-col items-center justify-center">
              <MarkOptimization
                // dates={formattedDates.map((date) =>
                //   parseInt(date.split("/")[0], 10)
                // )}
                values={data.map((item) => item.temperature)}
              />
              <div className="text-2xl font-black text-black">
                Humidity
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex justify-center gap-8 pb-8 pt-8">
            <div className="border-2 rounded-xl bg-[#d1d1d1] w-1/2 p-6 flex flex-col justify-center items-center">
              <MarkOptimization
                // dates={formattedDates.map((date) =>
                //   parseInt(date.split("/")[0], 10)
                // )}
                values={data.map((item) => item.pressure)}
              />
              <div className="text-2xl font-black text-black">
                Pressure
              </div>
            </div>
            <div className="border-2 rounded-xl bg-[#d1d1d1] w-1/2 p-4 flex flex-col items-center justify-center">
              <MarkOptimization
                // dates={formattedDates.map((date) =>
                //   parseInt(date.split("/")[0], 10)
                // )}
                values={data.map((item) => item.humidity)}
              />
              <div className="text-2xl font-black text-black">
                Temperature
              </div>
            </div>
          </div>
        </main>
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient
              id="customGradient"
              gradientUnits="objectBoundingBox"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="rgba(255,26,1,1)" />
              <stop offset="20%" stopColor="rgba(254,155,1,1)" />
              <stop offset="40%" stopColor="rgba(255,241,0,1)" />
              <stop offset="60%" stopColor="rgba(34,218,1,1)" />
              <stop offset="80%" stopColor="rgba(0,141,254,1)" />
              <stop offset="100%" stopColor="rgba(113,63,254,1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default App;
