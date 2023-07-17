import React, { useEffect, } from 'react';
import ReactSwitch from 'react-switch'
import api from '../axios/axios';




function ToggleSwitch({data,userId,handle,Block},change) {
    useEffect(()=>{

    },[change])

  const handleChange = () => {
    if(!data){
    Block(userId)
  }
    api.get('/admin/block',{
        params:{
            user:userId,
            action: data
        }
    }).then(()=>{
      
    handle()
    })
  }
  

  return (
    <div className="app" style={{textAlign: "center"}}>
      {/* <h4>Toggle switch in React</h4> */}
      <ReactSwitch
        checked={data}
        onChange={handleChange}
      />
    </div>
  );
}

export default ToggleSwitch;
