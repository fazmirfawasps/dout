import MobNum from "./Mob"
import Otp from "./Otp"
import Basepart from "./Basepart"
import InfoUser from "./Infouser"
  export function ShowLoginPart({ keyValue, Changekey ,ChangeEmail ,email,handleClose}) {
    switch (keyValue) {
      case 0:
        return <Basepart  key={keyValue} Changekey={Changekey} ChangeEmail={ChangeEmail} handleClose={handleClose}/>;
      case 1:
        return <InfoUser Changekey={Changekey}  email={email} handleClose={handleClose}/>;
      case 2:
        return <MobNum Changekey={Changekey} />;
      case 3:
        return <Otp Changekey={Changekey} />;
      default:
        return '';
    }
  }
  