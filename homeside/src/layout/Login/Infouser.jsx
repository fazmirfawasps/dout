import React, { useState } from 'react';
import { useForm, Controller, FormProvider, } from 'react-hook-form';
import { TextField,Stack } from '@mui/material';
import { Button } from '@mui/material';
import { UpdateUser } from '../../api/apicall';
export default function InfoUser({ Changekey,email ,handleClose }) {
  const methods = useForm();
  const[Moberror,setMoberror]=useState('')

  const onSubmit = (data) => {
    UpdateUser(email,data).then(({data})=>{
if(data){
  
  setMoberror('Mobile number already exists')
}
else{
  Changekey(0)
  handleClose()
}
    })
   
  };

  return (

    <FormProvider {...methods}>
      {/* <h1 onClick={() => Changekey(2)}>Infouser</h1> */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack
            direction={'column'}
            sx={{
                '& .MuiTextField-root': { m: 2, width: '90%' },
            }}
        >
        
        <Controller
          control={methods.control}
          name="FullName"
          rules={{ required: true, pattern:  /^[A-Z][^\s]+(?:$|.*[^\s]+$)/ }}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Full-Name"
              variant="outlined"
              error={Boolean(methods.formState.errors.FullName)}
              helperText={methods.formState.errors.FullName ? methods.formState.errors.FullName.type === 'pattern'
              ? 'Please note  first letter  should be capitalized'
              : 'Full name is required'
            : ''}
              {...field}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="MobileNumber"
          rules={{ required: true,  pattern: /^[0-9]{10}$/, }}
          render={({ field }) => (
            <TextField
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            error={Boolean(methods.formState.errors.MobileNumber)}
            helperText={methods.formState.errors.MobileNumber && 'Please enter a valid  10 digit mobile number  '}
            {...field}
          />
          )}
        />
         <p style={{color:'red',marginLeft:'20px'}}>{Moberror}</p>
        
        <Button variant="contained" type="submit"  sx={{m: 2, width: '90%',color:'white'}}>
          Submit
        </Button>
        </Stack>

        
      </form>
    </FormProvider>
  );
}
