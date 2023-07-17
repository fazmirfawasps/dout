import React, { } from 'react';
// import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Box, Stack, Typography,  MenuItem, Select } from '@mui/material'
import { Controller, useFormContext, } from 'react-hook-form'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
function PropertyAvailable() {
    const { control, formState } = useFormContext()
    const { errors } = formState
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

    return (
        // <Box component="div" sx={{ minHeight: '50vh', marginTop: '20px' }}>
        //     <Stack sx={{ flexDirection: 'column' }}>
        //         <Typography variant="h4" m={1} maxWidth={350}>
        //             Is your vehicle available right now?
        //         </Typography>
        //         {/* <Stack direction="row" sx={{ marginLeft: '100px' }}>

        //             <Controller
        //                 control={control}
        //                 name="Available"
        //                 defaultValue=""
        //                 rules={{ required: 'Please select an option' }}
        //                 render={({ field }) => (
        //                     <FormControl
        //                         component="fieldset"
        //                         error={Boolean(errors.Available)}
        //                     >

        //                         <RadioGroup
        //                             aria-label="yes-no"
        //                             name="Available"
        //                             value={field.value}
        //                             onChange={e => field.onChange(e.target.value)}
        //                             row
        //                         >
        //                             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        //                             <FormControlLabel value="no" control={<Radio />} label="No" />
        //                         </RadioGroup>
        //                         {errors.Available && (
        //                             <FormHelperText>{errors.Available?.message}</FormHelperText>
        //                         )}
        //                     </FormControl>
        //                 )}
        //             />



        //         </Stack> */}

        //   <InputLabel id="demo-simple-select-label">
        //     Available
        //   </InputLabel>

        //   <Controller
        //     control={control}
        //     name="Available"
        //     rules={{ required: true }}
        //     render={({ field }) => (<Select
        //       labelId="demo-simple-select-label"
        //       id="demo-simple-select"

        //       label="Available"

        //       sx={{ maxHeight: 80 }}
        //       MenuProps={MenuProps}
        //       {...field}>
        //                     {/* <MenuItem value="">Select an option</MenuItem> */}
        //                     <MenuItem value="yes">Yes</MenuItem>
        //                     <MenuItem value="no">No</MenuItem>
        //                 </Select>)}
        //             />
        //             {errors.Available && (
        //                 <Typography variant="caption" color={'red'}>
        //                     Select an option
        //                 </Typography>
        //             )}
        //     </Stack>
        // </Box>
        <Box component="div" sx={{ minHeight: '50vh', marginTop: '20px' }}>
            <Typography variant="h4" m={1} maxWidth={350} ml={5}>
                Is your vehicle available right now?
            </Typography>


            <Stack direction={'column'} pl={5} spacing={3}>
                <FormControl error={Boolean(errors.Available)} fullWidth >

                    <InputLabel id="demo-simple-select-label">
                        Available
                    </InputLabel>

                    <Controller
                        control={control}
                        name="Available"
                        rules={{ required: true }}
                        render={({ field }) => (<Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            
                            label="Available"
                            
                            sx={{ maxHeight: 80 }}
                            MenuProps={MenuProps}
                            {...field}

                        >

                            <MenuItem value = 'true'>Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>

                        </Select>)}
                    />
                    {errors.Available && (
                        <Typography variant="caption" color={'red'}>
                            Select an option
                        </Typography>
                    )}


                </FormControl>


            </Stack>
        </Box>
    );



}
export default PropertyAvailable