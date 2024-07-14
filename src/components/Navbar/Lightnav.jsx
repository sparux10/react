import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Title from '../Title/Title'
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Lightnav() {
  return (
    <div>
              <header className='nav-header'>
        <nav className='navbar'>
          <Title />
          
          <div className='btns'>
          <Link to={"/"}><FontAwesomeIcon icon={faLongArrowLeft} /></Link>
          </div>
        </nav>
      </header>
    </div>
  )
}
