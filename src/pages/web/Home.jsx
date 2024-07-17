import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

export default function Home() {

  return (
    <div>
      <Navbar />
      <Link to="dashbord"><h1>dashbord</h1></Link>
      
    </div>
  )
}
