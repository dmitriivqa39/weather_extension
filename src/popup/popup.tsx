import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import './popup.css'
import { fetchOpenWeaterData } from '../utils/api'

const App: React.FC<{}> = () => {

    useEffect(() => {
        fetchOpenWeaterData('Moscow').then((data) => console.log(data)).catch((err) => console.log(err))
    }, []) 

    return (
    <div> 
        <img src="icon.png" />
    </div>
)
}

const root = document.createElement("div");
document.body.appendChild(root);

createRoot(root).render(<App />);
