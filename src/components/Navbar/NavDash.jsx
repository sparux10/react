import { Link } from 'react-router-dom'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBars, faHome, faMoon,  faSun,  faX } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { Menu } from '../../Context/MenuContext'
import Title from '../Title/Title'
import DropDown from '../Profile/DropDown'





export default function NavDash() {
    const [isDark, setIsDark] = useState(false)
    const menu = useContext(Menu)
    const setIsOpen = menu.setisOpen
    return (
        <div>
            <header className='nav-header'>
                <nav className='navbar'>
                    <div className='nav-dash'>
                        
                        <FontAwesomeIcon onClick={() => setIsOpen(prev => !prev)} size='lg' icon={menu.isOpen ? faX : faBars} />
                        <Title />
                    </div>

                    <ul>
                        <Link to={'/'}><FontAwesomeIcon icon={faHome} /> </Link>
                        <button onClick={() => setIsDark(!isDark)}> {isDark ? <FontAwesomeIcon size='lg' icon={faMoon} /> : <FontAwesomeIcon size='lg' color='gray' icon={faSun} />}</button>
                    </ul>
                    
                    <DropDown />
                </nav>
            </header>
        </div>
    )
}
