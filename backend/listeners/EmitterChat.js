const  user = []


module.exports = {
    adduser: (userid,socketid)=>{
        const exists = user.find(user => user.userid === userid)
        if (!exists) {
            user.push({ userid, socketid });
        }
    },
    getReceiver: (receiverid) => {
        const  result = user.find(({ userid }) => userid == receiverid)
        return result
    },
    RemoveUser: (socketid) => {
        user = user.filter(user => user.socketid !== socketid)
    }
    , user,
    Getuser:()=>{
        return user
    }
}