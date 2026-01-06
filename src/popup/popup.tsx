import React from "react"
import { createRoot } from "react-dom/client";
import './popup.css'
import WeatherCard from "./WeatherCard";


const App: React.FC<{}> = () => {
    return (
    <div> 
        <WeatherCard city='Metlino' />
        <WeatherCard city='Ozersk' />
    </div>
 )
}

const root = document.createElement("div");
document.body.appendChild(root);

createRoot(root).render(<App />);
