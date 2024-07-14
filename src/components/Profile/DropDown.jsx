import './drop.css'
import picture from '../../assets/images.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Axios} from '../../API/Axios'
import { baseURL } from '../../API/api'


export default function DropDown() {

  const [data,setData] = useState(picture)

  /* useEffect(() => {
    async function p_img(){
      try{
        await Axios.get('/profile-img/')
        .then(data => setData(data.data.profile_image))
      }catch(err){console.log(err)}
    }
  p_img()
  }, []) */
  
  //const profileURL = baseURL+data

  return (
    <div>
      <div className="dropdown">
        <img src={picture} alt="profile" />
        <div className="dropdown-menu">
          <ul>
            <Link to="/profile" ><li>Profile</li></Link>
            <Link><li>settings</li></Link>
            <Link><li>log-in</li></Link>
          </ul>
        </div>
      </div>

    </div>
  ) 
}
