import { useState } from 'react'
import './fromstyle.css'
import Loading from '../../../components/loader/Loading'
import Navbar from '../../../components/Navbar/Navbar'
import { baseURL } from '../../../API/api'
import axios from 'axios'
import Cookie from 'cookie-universal'
import { Link } from 'react-router-dom'
import Notification from '../../../components/Notificate/Notification'


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [load, setLoad] = useState(false)
  const [note, setnote] = useState()

  const cookie = Cookie()
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }

  async function handleSubmit(e) {
    setLoad(true)
    e.preventDefault()

    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password);

    try {
      await axios.post(baseURL + '/auth/login/', formData)
      .then((data) => cookie.set('token', data.data.access))
      setLoad(false)
      window.location.pathname = "/dashbord"
    } catch (er) {
      console.log(er.response)
      setnote(er.response)
      setLoad(false)
    }
  }

  return (
    <div >
      <Navbar />
      <div className='form-style'>
        <form action="POST" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <div className='input_name'>Email:</div>
            <input onChange={handleEmail} placeholder='Enter your email' type="email" />
          </div>
          <div>
            <div className='input_name'>Password:</div>
            <input onChange={handlePassword} placeholder='Enter your password' type="text" />
          </div>
          <button>Login</button>
          <p> <span>Forgot Password?</span></p>
          <p>You don't have account <Link to={"/register"}><span>register</span></Link></p>
        </form>
      </div>
      {load && <Loading /> & <Notification title="login" message={note} />}
      
    </div>
  )
}
