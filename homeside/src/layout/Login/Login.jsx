import React , { useState } from "react"
import ModalPage from "./Modal";
  
  export default function Login() {
    const [Key, setKey] = useState(0);
    
    const Changekey = (num) => {
      setKey(num);
    }
  
    return (
        <ModalPage Key={Key} Changekey={Changekey}></ModalPage>
    );
  }