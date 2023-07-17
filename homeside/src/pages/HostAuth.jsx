import { useSelector } from 'react-redux'
import { Outconst, Navigate } from 'react-router-dom'
import React from 'react-dom'

function HostAuth() {
    const hosted = useSelector((state) => state.user.isHosted)
    return hosted ? <Outconst /> : <Navigate to="/" />
}

export default HostAuth
