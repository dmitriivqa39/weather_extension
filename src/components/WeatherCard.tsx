import React, { useEffect, useState } from "react"
import { fetchOpenWeatherData, openWeatherData, openWeatherTempScale } from '../utils/api'
import { Card, Button, CardContent, Typography, Box, CardActions } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


const WeatherCardContainer: React.FC<{
    children: React.ReactNode
    onDelete?: () => void
}> = ({children, onDelete}) => {
     return <Box mx={"4px"} my={'16px'}>
            <Card>
                <CardContent> {children} </CardContent>
                <CardActions>
                    {
                        onDelete &&  <Button color="error" onClick={onDelete}>Delete</Button>
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
            return <WeatherCardContainer onDelete={onDelete}>
                <Typography variant="body1">
                    {
                        cardState == 'loading' ? 'Loading...' : 'Error: Could not retrieve weather data for this city'
                    }
                </Typography>
                </WeatherCardContainer>
        }

        return (
            <WeatherCardContainer onDelete={onDelete}>
                <Typography variant="h5">{weatherData.name}</Typography>
                <Typography variant="body1">Temperature now: {Math.round(weatherData.main.temp)}</Typography>
                <Typography variant="body1">Feels like: {Math.round(weatherData.main.feels_like)}</Typography>
            </WeatherCardContainer>
        )
}

export default WeatherCard