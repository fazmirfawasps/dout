/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { TextField, Stack, Typography, Box, Autocomplete } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

function Propertydetail() {

    const { control, formState, setValue, getValues } = useFormContext()
    const { errors } = formState
    const [inputValue, setInputValue] = useState(getValues('Address'))
    const [suggestions, setSuggestions] = useState([])
    const handleAddress = async (event) => {
        if (event && event.target) {
            setInputValue(event.target.value);
            try {
                const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1IjoibWhkemFtIiwiYSI6ImNsZnRuOWVlczAyaTIzc25yNm96a3ltenoifQ.MfJmNXS8SqvbICe301UesA&autocomplete=true`;
                const response = await fetch(endpoint);
                const results = await response.json();
                setSuggestions(results?.features || []);
            } catch (error) {
                alert(err)
            }
        }
    }



    return (
        <Stack
            direction={'column'}
            minHeight={'50vh'}
            sx={{
                '& .MuiTextField-root': { m: 2, width: '100%' },
            }}
        >
            <Typography variant="h4" m={2} maxWidth={350}>
                Add short description about your place
            </Typography>
            <Controller
                control={control}
                name="PropertyName"
                rules={{ required: true, pattern: /^[^\s]+(?:$|.*[^\s]+$)/ }}
                render={({ field }) => (
                    <TextField
                        id="outlined-basic"
                        label="Property Name"
                        variant="outlined"
                        error={Boolean(errors.PropertyName)}
                        helperText={
                            errors.PropertyName && 'Property name is required'
                        }
                        {...field}
                    />
                )}
            />
            {/* <Controller
                control={control}
                name="Address"
                rules={{ required: true, pattern: /[^\s\\]/ }}
                render={({ field }) => (
                    <TextField
                        id="outlined-multiline-static"
                        label="Address for property"
                        multiline
                        rows={2}
                        error={Boolean(errors.Description)}
                        helperText={
                            errors.Description &&
                            'Addres for property is required'
                        }
                        {...field}
                    />
                )}
            /> */}
            <Controller
                control={control}
                name="Address"
                rules={{ required: 'location required' }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Autocomplete
                            id="combo-box-demo"
                            options={suggestions}
                            inputValue={inputValue}
                            {...field}
                            onChange={(event, newValue) => {
                                setInputValue(newValue?.place_name || '');
                                setValue('Address', newValue?.place_name || '');
                            }}
                            onInputChange={handleAddress}
                            getOptionLabel={(option) => (option?.place_name || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Enter location"
                                />
                            )}
                            renderOption={(props, option) => (
                                <li {...props}>{option?.place_name || ''}</li>
                            )}
                        />
                        {error && (
                            <Typography
                                variant="caption" sx={{ color: 'red', textAlign: 'left', marginLeft: '40px' }}
                            >
                                {error.message}{' '}
                            </Typography>
                        )}
                    </>
                )}
            />

            <Controller
                control={control}
                name="Description"
                rules={{ required: true, pattern: /[^\s\\]/ }}
                render={({ field }) => (
                    <TextField
                        id="outlined-multiline-static"
                        label="Description for property"
                        multiline
                        rows={4}
                        error={Boolean(errors.Description)}
                        helperText={
                            errors.Description &&
                            'Description for property is required'
                        }
                        {...field}
                    />
                )}
            />

        </Stack>
    )
}

export default Propertydetail
