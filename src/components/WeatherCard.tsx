import React, { useEffect, useState } from "react"
import {fetchOpenWeatherData, getWeatherIconSrc, openWeatherData, openWeatherTempScale} from '../utils/api'
import { Card, Button, CardContent, Typography, Box, CardActions, Grid } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './WeatherCard.css'


const WeatherCardContainer: React.FC<{
    children: React.ReactNode
    onDelete?: () => void
}> = ({children, onDelete}) => {
     return <Box mx={"4px"} my={'16px'}>
            <Card>
                <CardContent> {children} </CardContent>
                <CardActions>
                    {
                        onDelete &&  <Button color="error" onClick={onDelete}>
                            <Typography className="weatherCard-body">
                                Delete
                            </Typography>
                        </Button>
                    }
                </CardActions>
            </Card>
            </Box>
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
    city: string
    tempScale: openWeatherTempScale
    onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
    const [weatherData, setWeatherData] = useState<openWeatherData | null>(null)
    const [cardState, setCardState] = useState<WeatherCardState>('loading')

    useEffect(() => {
            fetchOpenWeatherData(city, tempScale)
            .then((data) => {
                    setWeatherData(data)
                    setCardState("ready")

            }).catch((err) => setCardState("error"))
        }, [city, tempScale])

        if (cardState == 'loading' || cardState == 'error') {
            return (<WeatherCardContainer onDelete={onDelete}>
                <Typography className="weatherCard-title">{city}</Typography>
                <Typography className="weatherCard-body">
                    {
                        cardState == 'loading' ? 'Loading...' : 'Error: Could not retrieve weather data for this city'
                    }
                </Typography>
                </WeatherCardContainer>)
        }

        return (
            <WeatherCardContainer onDelete={onDelete}>
                <Grid container justifyContent='space-around'>
                    <Grid>
                        <Typography className="weatherCard-title">{weatherData.name}</Typography>
                        <Typography className="weatherCard-temp">{Math.round(weatherData.main.temp)}</Typography>
                        <Typography className="weatherCard-body">Feels like: {Math.round(weatherData.main.feels_like)}</Typography>
                    </Grid>
                    <Grid>
                        {
                            weatherData.weather.length > 0 && <>
                                <img src={getWeatherIconSrc(weatherData.weather[0].icon)}/>
                                <Typography className="weatherCard-body">{weatherData.weather[0].main}</Typography>
                            </>}
                    </Grid>
                </Grid>
            </WeatherCardContainer>
        )
}

export default WeatherCard