import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import './popup.css'
import WeatherCard from "./WeatherCard"
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Paper, InputBase, IconButton, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'


const App: React.FC<{}> = () => {

    const [cities, setCities] = useState<string[]>([
        'Kill',
        'Newbridge',
        'Naas',
        'Athy',
        'Error'
    ])

    const [cityInput, setCityInput] = useState<string>('')

    const handleCityButtonClick = () => {
        if (cityInput === '') {
            return
        }
        setCities([...cities, cityInput])
        setCityInput('')
    }

    const handleCityDeleteButtonClick = (index: number) => {
        cities.splice(index, 1)
        setCities([...cities])
    }

    return (
    <Box mx='8px' my='16px'> 
    <Grid container >
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
            </Grid>
        {
            cities.map((city, index) => <WeatherCard city={city} key={index} onDelete={() => handleCityDeleteButtonClick(index)} />)
        } 
         <Box height='16px' />
    </Box>
 )
}

const root = document.createElement("div");
document.body.appendChild(root);

createRoot(root).render(<App />);
