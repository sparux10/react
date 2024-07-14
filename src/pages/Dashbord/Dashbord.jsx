import NavDash from "../../components/Navbar/NavDash"
import Sidebar from "../../components/Sidebar/Sidebar"
import { Outlet } from 'react-router-dom'
import "../../components/Table/table.css"

export default function Dashbord() {



  return (
    <div>
      <NavDash />
      <div  style={{display: "flex"}}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
