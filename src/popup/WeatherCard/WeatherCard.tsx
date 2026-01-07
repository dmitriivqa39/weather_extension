import React, { useEffect, useState } from "react"
import { fetchOpenWeaterData, openWeaterData } from '../../utils/api'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


const WeatherCardContainer: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
     return <Box mx={"4px"} my={'16px'}>
            <Card>
            <CardContent> {children} </CardContent>
            </Card>
            </Box>
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
    city: string
}> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<openWeaterData | null>(null)
    const [cardState, setCardState] = useState<WeatherCardState>('loading')

    useEffect(() => {
            fetchOpenWeaterData(city)
            .then((data) => {
                    setWeatherData(data)
                    setCardState("ready")

            }).catch((err) => setCardState("error"))
        }, [city])

        if (cardState == 'loading' || cardState == 'error') {
            return <WeatherCardContainer>
                <Typography variant="body1">
                    {
                        cardState == 'loading' ? 'Loading...' : 'Error: Could not retrieve weather data for this city'
                    }
                </Typography>
                </WeatherCardContainer>
        }

        return (
            <WeatherCardContainer>
                <Typography variant="h5">{weatherData.name}</Typography>
                <Typography variant="body1">Температура сейчас: {Math.round(weatherData.main.temp)}</Typography>
                <Typography variant="body1">Ощущается: {Math.round(weatherData.main.feels_like)}</Typography>
            </WeatherCardContainer>
        )
}

export default WeatherCard