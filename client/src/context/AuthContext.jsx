import { useState } from "react";

const AuthContext = ()=>{
const [isloggedin, setIsLoggedIn] = useState(false);
return {isloggedin, setIsLoggedIn};
}
export default AuthContext;