import React, { useState ,useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import { ShowLoginPart } from './ShowLoginPart';
import {  Typography,} from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { ExternalContext } from '../../context/CustomContext';



export default function ModalPage({Key,Changekey}) {
    const {show, setShow}=  useContext(ExternalContext)


    const handleClose = () =>{setShow(false) 
        document.body.style.overflow= 'inherit'; 
        } ;
    const handleShow = () => setShow(true);
    const [email,setEmail] =useState('')
    const ChangeEmail = (emil)=>{
    setEmail(emil)
    }

    return (
        <>
           
            <Typography textAlign="center" onClick={handleShow}> Login </Typography>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} style={{marginTop:'100px'}}>
                {/* <Modal.Header   style={{ textAlign: 'center',marginLeft:'50px' }} closeButton>
                    <Modal.Title style={{ margin: 'auto' }}>{Heading[Key]}</Modal.Title>
                </Modal.Header> */}
                <Modal.Body><ShowLoginPart  keyValue={Key} Changekey={Changekey} ChangeEmail={ChangeEmail} email={email} handleClose={handleClose}></ShowLoginPart>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer> */}
            </Modal>
        </>
    );
}
