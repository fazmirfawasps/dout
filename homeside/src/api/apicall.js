import api from "../axios/axios";


export function Addproperty(data, id) {
    const formData = new FormData()
    formData.append('hostid', id)
    formData.append('PropertyName', data['PropertyName'])
    formData.append('Description', data['Description'])
    formData.append('VehicleType', data['vehicleType'])
    formData.append('Address', data['Address'])
    formData.append('Price', data['Price'])
    formData.append('Available', data['Available'])
    formData.append('Activate',true)

    // Append facility object
 

    // Append amenties object

   

    // Append images array

    const file = data.images

    for (let i = 0; i < file.length; i++) {
        formData.append('images', file[i])
    }

    return api.post('/host/addproperty', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
}})
}

export function VehicleType() {
    return api.get('/host/getvehicleType')
}

export function GetHostedProperty(id) {
    const formData = new FormData()
    formData.append('hostid', id)
    return api.post('/host/getHostedproperty',formData)
}
export function GetAllProperty() {
  
    return api.get('/getAllproperty')
}
export function GetAProperty(id) {
    const formData = new FormData()
    formData.append('proid', id)
    return api.post('/getAproperty',formData)
}
export function EditHostedProperty(data,old) {
    const formData = new FormData()
    formData.append('Propertid',data['_id'])
    // formData.append('hostid', id)
    formData.append('PropertyName', data['PropertyName'])
    formData.append('Description', data['Description'])
    formData.append('VehicleType', data['vehicleType'])
    formData.append('Address', data['Address'])
    formData.append('Price', data['Price'])
    formData.append('Available', data['Available'])
    formData.append('Activate',true)
    const  file = data.images
    for (let i = 0; i < file.length; i++) {
        formData.append('images', file[i])
    }
    for (let i = 0; i < old.images.length; i++) {
        formData.append('oldimages', old.images[i])
    }
    return api.post('/host/EditHostedproperty',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
}})
}
export function UpdateUser(email,user) {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('FullName', user.FullName)
    formData.append('MobileNumber', user.MobileNumber)
    return api.post('/updateUser',formData)
}
export function CheckMobNo(mob){
    const formData = new FormData()
    formData.append('MobileNumber', mob)

    return api.post('/checkMobNo',formData)

}
export function deleteProperty(id) {
    return api.delete(`/removeProperty/${id}`)
}
export function SendHostDetails(data,id) {
    const formData = new FormData()
    formData.append('hostid', id)
    formData.append('AadharNumber', data['AadharNumber'])
    formData.append('DateOfBirth', data['DateOfBirth'])
    formData.append('FullName', data['FullName'])
    formData.append('Address', data['Address'])
    formData.append('PanCard', data['PanCard'])
    formData.append('RentalLicensePermit', data['RentalLicensePermit'])

    formData.append('image', data['Image'])
    
    return api.post('/hostdetails',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
}})
}
export function checkout(
    property,
    checkin,
    checkOut,
    userid,
    totalAmunt,
    
) {
    property.checkin = checkin
    property.checkOut = checkOut
    property.userid = userid
    property.totalAmount = totalAmunt
    
    return api.post('/create-checkout-session', { property })
}
export function verifyOrder() {
    return api.post('/placeOrder')
}
export function getUserOrders(userid) {
    return api.get(`/viewOrders/${userid}`)
}

export function Cancelorder(orderid) {
    return api.patch(`/Cancelbooking/${orderid}`)
}
export function postwishlist(userid, item) {
    const data = {
        userid,
        item,
    }
    return api.post('/addtowishlist', data)
}

export function deleteWishlist(userid, wishlistid) {
    return api.post(`/removeWishlist/${userid}/${wishlistid}`)
}
export function getWishlist(userid) {
    return api.get('/getWishlist/' + userid)
}
export function addconverstaion(data) {
    return api.post('/addconversation', data)
}

export function getconversation(userid) {
    return api.get('/getConversation/' + userid)
}

export function postMessage(data) {
    return api.post('/addmessages', data)
}

export function getMessages(conversationid) {
    return api.get('/getMessages/' + conversationid)
}
export function editProfile(name,mob,id) {
    const formData = new FormData()
    formData.append('id', id)

    formData.append('FullName', name)
    formData.append('MobileNumber',mob)
    return api.post('/editProfile/' ,formData)
}
export function  getUserDetail(id) {
   
    return api.get(`/getauserdetail/${id}`)
}

