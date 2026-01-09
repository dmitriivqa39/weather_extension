import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import './popup.css'
import WeatherCard from "./WeatherCard"
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Paper, InputBase, IconButton, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import {
    setStoredCities,
    setStoredOptions,
    getStoredCities,
    getStoredOption,
    LocalStorageOptions
} from "../utils/storage"


const App: React.FC<{}> = () => {

    const [cities, setCities] = useState<string[]>([])
    const [cityInput, setCityInput] = useState<string>('')
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)

    useEffect(() => {
        getStoredCities().then(cities => setCities(cities))
        getStoredOption().then(options => setOptions(options))
    }, [])

    const handleCityButtonClick = () => {
        if (cityInput === '') {
            return
        }
        const updatedCities = [...cities, cityInput]
        setStoredCities(updatedCities).then(() => {
        setCities(updatedCities)
        setCityInput('')
        }) 
    }

    const handleCityDeleteButtonClick = (index: number) => {
        cities.splice(index, 1)
        const updatedCities = [...cities]
        setStoredCities(updatedCities).then(() => {
            setCities(updatedCities)
        })
    }

    const handleTempScaleButtonClick = () => {
        const updatedOptions: LocalStorageOptions = {
            ...options,
            tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric'
        }
        setStoredOptions(updatedOptions).then(() => {
            setOptions(updatedOptions)
        })
    }

    if (!options) {
        return null
    }

    return (
    <Box mx='8px' my='16px'> 
    <Grid container justifyContent="space-evenly">
        <Paper>
                <Box px='15px' py='5px'>
                    <InputBase placeholder="Add a city name"
                    value={cityInput}
                    onChange={(event) => setCityInput(event.target.value)}
                    />
                    <IconButton onClick={handleCityButtonClick}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Paper>
        <Grid>
            <Paper>
                <Box px='5px' py='5px'>
                    <IconButton onClick={handleTempScaleButtonClick}>
                        {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
                    </IconButton>
                </Box>
            </Paper>
        </Grid>
            </Grid>
        {
            options.homeCity != '' && <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
        }
        {
            cities.map((city, index) =>
                <WeatherCard city={city} key={index} tempScale={options.tempScale} onDelete={() => handleCityDeleteButtonClick(index)} />)
        } 
         <Box height='16px' />
    </Box>
 )
}

const root = document.createElement("div");
document.body.appendChild(root);

createRoot(root).render(<App />);
