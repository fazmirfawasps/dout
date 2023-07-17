// import React from "react";
// // import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'



// export default function RoomPage() {
//     const id = 'Fazmir'
   

//     const Mymeeting = async (element) => {
//         const appID = 513636533;
//         const serverSecret = "d0c2d3fd6934aa209f5cc0b5b83a3d8f";
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, Date.now().toString(),id);
//         const zp = ZegoUIKitPrebuilt.create(kitToken);
//         // start the call
//         zp.joinRoom({
//             container: element,
//             sharedLinks:[ {
//                 name: 'Copy lINK',
//                 url: `http://localhost:3001/room/${id}`
//             }],

//             scenario: {
//                 mode: ZegoUIKitPrebuilt.OneONoneCall,

//             },
//             showScreenSharingButton: true
//         });
//     };

//     return (
//         <div>
//             <div ref={Mymeeting}></div>
//         </div>
//     )
// }