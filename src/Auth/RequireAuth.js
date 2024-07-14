import { Navigate, Outlet } from "react-router-dom";
import Cookie from 'cookie-universal'
import { useEffect, useState } from "react";
import { Axios } from '../API/Axios'
import Loading from "../components/loader/Loading";



export default function RequireAuth({ allowedRole }) {

    const [isAdmin, setIsAdmin] = useState("")
    const cookie = Cookie()
    const token = cookie.get('token')



    useEffect(() => {
        Axios.get('/user/')
            .then((data) => setIsAdmin(data.data)).catch(() => <Navigate to={"/login"} replace={true} />)
    }, []);



    return token ?  (isAdmin === "" ? <Loading /> : allowedRole.includes(isAdmin[0].name) ? <Outlet /> : <div>not found</div>) : <Navigate to={"/login"} replace={true} />;
}
