import React from "react"
import { createRoot } from "react-dom/client"
import './popup.css'
import WeatherCard from "./WeatherCard"
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


const App: React.FC<{}> = () => {
    return (
    <div> 
        <WeatherCard city='Metlino' />
        <WeatherCard city='Ozersk' />
        <WeatherCard city='Error' />
    </div>
 )
}

const root = document.createElement("div");
document.body.appendChild(root);

createRoot(root).render(<App />);
