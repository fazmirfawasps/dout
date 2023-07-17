import React , {useEffect,useContext }from "react";
import { Outconst ,Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";

import { ExternalContext } from '../context/CustomContext';

export  default function  Userauth(){
    const { setShow}=  useContext(ExternalContext)
   
    const logged = useSelector((state) => state.user.id)
    useEffect(()=>{
        if(!logged){
            setShow(true)

        }



       
    },[logged])

    return logged ? <Outconst/> : <Navigate to="/" />
 
}