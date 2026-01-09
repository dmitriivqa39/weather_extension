import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import './options.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Card, CardContent, Typography, TextField, Grid, Box, Button } from '@mui/material'
import {
    getStoredOption, LocalStorageOptions, setStoredOptions
} from "../utils/storage";

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)
    const [formState, setFormState] = useState<FormState>('ready')
    useEffect(() => {
        getStoredOption().then((options) => setOptions(options))
    }, []);

    const handleHomeCityChange = (homeCity: string) => {
        setOptions({
            ...options,
            homeCity,
        })
    }

    const handleSaveButtonClick = () => {
        setFormState('saving')
        setStoredOptions(options).then(() => {
            setTimeout(() => {
                setFormState('ready')
            }, 1000)
        })
    }

    if (!options) {
        return null
    }

    const isFieldsDisabled = formState === 'saving'

    return (
        <Box mx="10%" my="2%">
            <Card>
            <CardContent>
                <Grid container direction="column" spacing={4}>
                    <Grid>
                        <Typography variant="h4">
                            Weather Extension Options
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body1">
                            Home city name
                        </Typography>
                        <TextField fullWidth placeholder="Enter a home city name"
                                   value={options.homeCity}
                                   onChange={event =>
                                       handleHomeCityChange(event.target.value)}
                                   disabled={isFieldsDisabled} />
                    </Grid>
                    <Grid>
                        <Button variant="contained" color="primary"
                                onClick={handleSaveButtonClick}
                                disabled={isFieldsDisabled}>
                            {formState === 'ready' ? 'Save' : 'Saving..'}
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            </Card>
        </Box>
    )
}

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);
