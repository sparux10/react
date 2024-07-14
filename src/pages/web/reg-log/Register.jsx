import { useState } from 'react'
//import './fromstyle.css'
import axios from 'axios'
import { baseURL } from '../../../API/api'
import Navbar from '../../../components/Navbar/Navbar'
import Loading from '../../../components/loader/Loading'
import { Link } from 'react-router-dom'

export default function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [load, setLoad] = useState(false)
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();


  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

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
      await axios.post(baseURL + '/auth/register/', formData)
        .then((data) => console.log(data))
      setLoad(false)
    } catch (er) {
      console.log(er.response)
      setLoad(false)
    }
  }


  return (
    <div >
      <Navbar />
      <div className='form-style'>
        <form action="POST" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div>
            <div className='input_name'>Password:</div>
            <input onChange={handleFirstNameChange} placeholder='Enter your first name' type="text" />
          </div>
          <div>
            <div className='input_name'>Password:</div>
            <input onChange={handleLastNameChange} placeholder='Enter your last name' type="text" />
          </div>
          <div>
            <div className='input_name'>Email:</div>
            <input onChange={handleEmail} placeholder='Enter your email' type="email" />
          </div>
          <div>
            <div className='input_name'>Password:</div>
            <input onChange={handlePassword} placeholder='Enter your password' type="text" />
          </div>

          <button>Register</button>

          <p>allready have account <Link to={"/login"}><span>log-in</span></Link></p>
        </form>
      </div>
      {load && <Loading />}
    </div>
  )
}