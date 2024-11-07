import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import axios from "axios";
import MarkOptimization from "./components/Line";
import RadarChart from "./components/Radar-chart";
// import { useFetchOneData } from "./hooks/fetchData";

function App() {
  const [air, setAir] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [altitude, setAltitude] = useState(0);
  interface DataItem {
    date: string;
    temperature: number;
    altitude: number;
    pressure: number;
    humidity: number;
    air: number;
  }

  const [data, setData] = useState<DataItem[]>([]);

  const formattedDates = data.map((item) => {
    const date = new Date(item.date);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
    return `${day}/${month}`;
  });

  const getData = () => {
    axios
      .get(
        "https://api.thingspeak.com/channels/2709347/feeds.json?api_key=LO89N2RN4ROXFUL2&results=1"
      )
      .then((response) => {
        console.log(response.data);

        // Parse and round data, then store them in local variables
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
          .post("http://localhost:3000/add", {
            air: air,
            temperature: temperature,
            humidity: humidity,
            pressure: pressure,
            altitude: altitude,
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
      });
  };

  const history = () => {};
  console.log(history);

  useEffect(() => {
    axios.get("http://localhost:3000/get").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
    for (let i = 0; i <= 100; i++) {
      setTemperature(i);
      setAltitude(i);
      setPressure(i);
      setHumidity(i);
    }
    setTimeout(() => {
      for (let i = 100; i >= 0; i--) {
        setTemperature(i);
        setAltitude(i);
        setPressure(i);
        setHumidity(i);
      }
    }, 1500);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <SidebarProvider>
        <AppSidebar />
        {/* <SidebarTrigger /> */}
        <main className="w-screen ml-2">
          <Navbar />
          <div className="flex justify-center p-8 items-center">
            <button
              onClick={getData}
              className="bg-slate-800 p-4 px-8 rounded-xl hover:bg-slate-100 hover:t"
            >
              Click me
            </button>
          </div>
          <div className="flex items-center">
            <div className="w-[50%] flex justify-center h-80 border p-0  border-r-2 rounded-xl mx-14">
              <RadarChart
                data={data.slice(0, 5).map((item, index) => ({
                  subject: `${formattedDates[index]}`, // Use the formatted date for the subject
                  A: item.air,
                  B: item.humidity,
                  fullMark: 500,
                }))}
              />
            </div>
            <div className="border border-r-2  mr-20 rounded-xl w-[50%] flex justify-center items-center border-white h-80 mx-14">
              Carry an umbrella it might rain heavily today.
            </div>
          </div>

          <div className="flex items-center justify-center mt-20">
            <div className="flex justify-start gap-10">
              <div className="border-white-100  ">
                <CircularProgressbar
                  value={temperature}
                  minValue={20}
                  maxValue={50}
                  text={`${temperature} C \n Temperature`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                    pathColor: "url(#customGradient)",
                  })}
                />
              </div>
              <div className="border-white-100 border-l border-r px-10">
                <CircularProgressbar
                  value={pressure}
                  minValue={95000}
                  maxValue={101320}
                  text={`${pressure} Pa Pressure`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                    pathColor: "url(#customGradient)",
                  })}
                />
              </div>
              <div className="border-white-100 border-r pr-10">
                <CircularProgressbar
                  value={Math.floor(altitude / 100)}
                  minValue={0}
                  maxValue={10}
                  text={`${Math.floor(altitude / 100)} m Altitude`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                    pathColor: "url(#customGradient)",
                  })}
                />
              </div>
              <div className="border-white-100">
                <CircularProgressbar
                  value={humidity}
                  minValue={0}
                  maxValue={100}
                  text={`${humidity}% Humidity`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                    pathColor: "url(#customGradient)",
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-evenly pb-8 pt-8">
            <div className="pl-16 ml-3">
              <MarkOptimization
                dates={formattedDates.map((date) =>
                  parseInt(date.split("/")[0], 10)
                )} // Extract day (DD) and convert to number
                values={data.map((item) => item.altitude)}
              />
            </div>
            <div className="pr-16 ml-3">
              <MarkOptimization
                dates={formattedDates.map((date) =>
                  parseInt(date.split("/")[0], 10)
                )} // Extract day (DD) and convert to number
                values={data.map((item) => item.temperature)}
              />
            </div>
          </div>
          <div className="flex justify-evenly pb-8 pt-8">
            <div className="pl-16 ml-3">
              <MarkOptimization
                dates={formattedDates.map((date) =>
                  parseInt(date.split("/")[0], 10)
                )} // Extract day (DD) and convert to number
                values={data.map((item) => item.pressure)}
              />
            </div>
            <div className="pr-16 ml-3">
              <MarkOptimization
                dates={formattedDates.map((date) =>
                  parseInt(date.split("/")[0], 10)
                )} // Extract day (DD) and convert to number
                values={data.map((item) => item.humidity)}
              />
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
      </SidebarProvider>
    </div>
  );
}

export default App;
