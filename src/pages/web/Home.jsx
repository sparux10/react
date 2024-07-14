import { Link } from 'react-router-dom'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../../components/Navbar/Navbar'

export default function Home() {

  return (
    <div>
      <Navbar />
      Home
      <FontAwesomeIcon icon={faMoon} />
      <Link to="dashbord"><h1>dashbord</h1></Link>
    </div>
  )
}
