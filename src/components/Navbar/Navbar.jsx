import { Link } from 'react-router-dom'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Title from '../Title/Title'
import DropDown from '../Profile/DropDown'


export default function Navbar() {

  const [isDark, setIsDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)




  return (
    <div>
      <header className='nav-header'>
        <nav className='navbar'>
          <Title />
          <div className={`${isOpen ? 'menu' : 'hidden'}`}>
            <ul className='unlist'>
              <li><Link to={'/'}>Home</Link></li>
              <li>Services</li>
              <li>About</li>
              <li>contact</li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div className='btns'>
            <button onClick={() => setIsDark(!isDark)}> {isDark ? <FontAwesomeIcon size='lg' icon={faMoon} /> : <FontAwesomeIcon size='lg' color='gray' icon={faSun} />}</button>
            <DropDown />
            <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? 'i_x_menu' : 'i_menu'}`}>
              <span className='_1'></span>
              <span className='_2'></span>
              <span className='_3'></span>
            </button>
          </div>
        </nav>
      </header>

    </div>
  )
}
