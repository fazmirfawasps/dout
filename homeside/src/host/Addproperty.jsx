import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography, TextField,} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
// import { FormProvider, useForm } from 'react-hook-form';
import { VehicleType } from '../api/apicall'


function AddpropertyType() {


  const { control, formState,} = useFormContext()
  const { errors } = formState

  const [data, setData] = useState([
  
  ])

  useEffect(()=>{
  VehicleType().then(({data})=>{
    setData(data)
  })
  },[])

  //   const [inputValue, setInputValue] = useState(getValues('Address'))
  //     const [suggestions, setSuggestions] = useState([])

  const ITEM_HEIGHT = 45
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }
  const [vehicleType, setvehicleType] = React.useState('')
  const handleChange = (event) => {
    setvehicleType(event.target.value)
  }





  return (
    // <FormProvider {...methods}>
    <Box component="div" sx={{ minHeight: '50vh', marginTop: '20px' }}>
      <Typography variant="h4" m={1} maxWidth={350} ml={5}>
        What kind of vehicle will you host?
      </Typography>


      <Stack direction={'column'} pl={5} spacing={3}>
        <FormControl error={Boolean(errors.RoomType)} fullWidth >

          <InputLabel id="demo-simple-select-label">
            VehicleType
          </InputLabel>

          <Controller
            control={control}
            name="vehicleType"
            rules={{ required: true }}
            render={({ field }) => (<Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vehicleType}
              label="vehicleType"
              onChange={handleChange}
              sx={{ maxHeight: 80 }}
              MenuProps={MenuProps}
              {...field}

            >
              {data?.map((item) => (
                <MenuItem key={item._id} value={item.Category}>
                  <Stack direction={'row'} spacing={2}>
                    <img
                      width={80}
                      src={item.image}
                      alt="text"
                    />
                    <Typography varient="h4" textAlign={'center'}>
                      {'   ' + item.Category}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>)}
          />
          {errors.vehicleType && (
          <Typography variant="caption" color={'red'}>
            Select an option
          </Typography>
        )}

        
        </FormControl>
        <Controller
                    control={control}
                    name="Price"
                    rules={{ required: true, pattern: /^\d+$/ }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Price per Day"
                            error={Boolean(errors.Price)}
                            helperText={errors.Price && 'Price is required'}
                            id="fullWidth"
                            {...field}
                        />
                    )}
                />

      </Stack>
    </Box>
    //   </FormProvider>

  )
}
export default AddpropertyType