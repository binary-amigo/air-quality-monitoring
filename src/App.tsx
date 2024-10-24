import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    for (let i = 0; i <= 100; i++) {
      setCount(i);
    }
    setTimeout(() => {
      for (let i = 100; i >= 0; i--) {
        setCount(i);
      }
    }, 1500);
  }, []);

  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-screen">
          <SidebarTrigger />
          <button onClick={() => setCount(59)}>CLick me</button>
          <Navbar />
          <div className="flex items-center justify-center h-screen">
            <div className="flex justify-start gap-10">
              <div className="border-white-100  ">
                <CircularProgressbar
                  value={count}
                  text={`${count}% Temperature`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                  })}
                />
              </div>
              <div className="border-white-100 border-l border-r px-10">
                <CircularProgressbar
                  value={count}
                  text={`${count}% Temperature`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                   textSize: "8px",
                  })}
                />
              </div>
              <div className="border-white-100 border-r pr-10">
                <CircularProgressbar
                  value={count}
                  text={`${count}% Temperature`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                  })}
                />
              </div>
              <div className="border-white-100">
                <CircularProgressbar
                  value={count}
                  text={`${count}% Temperature`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    textSize: "8px",
                  })}
                />
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
