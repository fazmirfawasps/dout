import React, { useEffect, useState } from 'react'
import Profile from '../layout/Profile'
import { useSelector } from 'react-redux'
import { getUserDetail } from '../api/apicall'
function ProfilePage() {
    const [username, setuser] = useState('')
    const [phonenumber, setpon] = useState('')
    const [email, setemail] = useState('')
    const [change, setChange] = useState(false)
    const [wallet, setWallet] = useState(0)

    const Changeeffect = () => {
        setChange(!change)
    }
    const userId = useSelector((state) => state.user.id)
    useEffect(() => {
        getUserDetail(userId).then(({ data }) => {
            setpon(data[0].MobileNumber)

            setuser(data[0].FullName)
            setemail(data[0].Email)
            if(data[0].Wallet){
                setWallet(data[0].Wallet)
            }

        }).catch((err) => {
            alert(err)
        })
    }, [change])
    const address = 'palatskdsndk'

    return (
        <Profile
            name={username}
            phoneNumber={phonenumber}
            email={email}
            Address={address}
            wallet={wallet}
            callBack={Changeeffect}
        />
    )
}

export default ProfilePage
