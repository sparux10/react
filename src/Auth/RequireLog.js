import Cookie from 'cookie-universal'
import { Navigate, Outlet } from 'react-router-dom'

export default function Requirelog() {

    const cookie = Cookie()
    const token = cookie.get('token')

    return token ? <Outlet /> : <Navigate to={"/login"} />
}
