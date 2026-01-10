const OPEN_WEATHER_API_KEY = '4d8ee5563de3dfdf772e76d2859daca8'

export interface openWeatherData {
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    deg: number
    speed: number
  }
}

export type openWeatherTempScale = 'metric' | 'imperial'

export async function fetchOpenWeatherData(city: string, tempScale: openWeatherTempScale): Promise<openWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`,
  )

  if (!res.ok) {
    throw new Error('City not found.')
  }

  return await res.json()
}
