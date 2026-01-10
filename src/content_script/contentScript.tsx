import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import WeatherCard from "../components/WeatherCard";
import './contentScript.css'
import {getStoredOption, LocalStorageOptions} from "../utils/storage";
import { Card } from "@mui/material";
import { Messages} from "../utils/messages";

const App: React.FC = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        getStoredOption().then((options) => {
            setOptions(options)
            setIsActive(options.hasAutoOverlay)
        })
    }, [])

    useEffect(() => {
        const listener = (msg: any) => {
            if (msg === Messages.TOGGLE_OVERLAY) {
                setIsActive(prev => !prev)
            }
        };
        chrome.runtime.onMessage.addListener(listener);
        return () => {
            chrome.runtime.onMessage.removeListener(listener)
        };
    }, []);


    if (!options) {
        return null
    }

    return (
        <>
        {
            isActive && (<Card className='overlayCard'>
            <WeatherCard city={options.homeCity} tempScale={options.tempScale} onDelete={() => setIsActive(false)}/>
            </Card>)
        }
        </>
    )
}

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);