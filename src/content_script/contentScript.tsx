import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import WeatherCard from "../components/WeatherCard";
import './contentScript.css'
import {getStoredOption, LocalStorageOptions} from "../utils/storage";
import { Card } from "@mui/material";

const App: React.FC = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [isActive, setActive] = useState<boolean>(false)

    useEffect(() => {
        getStoredOption().then((options) => {
            setOptions(options)
            setActive(options.hasAutoOverlay)
        })
    }, []);

    if (!options) {
        return null
    }

    return (
        <>
        {
            isActive && (<Card className='overlayCard'>
            <WeatherCard city={options.homeCity} tempScale={options.tempScale} onDelete={() => setActive(false)}/>
        </Card>)
        }
        </>
    )
}

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);