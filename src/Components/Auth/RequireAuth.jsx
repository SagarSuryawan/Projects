import { useSelector } from "react-redux"
import { Navigate, Outlet,  } from "react-router-dom";

function RequireAuth({ allowedRole }) {

    //  to access state need useSelector, auth part is accessed
    const  {isLoggedIn , role } = useSelector((state) => state.auth)

    

    return isLoggedIn && allowedRole.find((myRole)=> myRole == role) ? (
        <Outlet/>
    ):  isLoggedIn ? ( <Navigate to= "/denied" /> ) : ( <Navigate to="/login" /> )

}

export default RequireAuth;