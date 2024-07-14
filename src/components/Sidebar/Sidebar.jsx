import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faAdd, faTable, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "../../Context/MenuContext";
import './sidebar.css';

export default function SideBar() {
    const [active, setActive] = useState(0);
    const menu = useContext(Menu);

    return (
        <div className='side-bar'>
            <div className='links'>
                <div onClick={() => setActive(1)} className={`${active === 1 ? 'active' : ''} sidebar-link `}>
                    <Link to="users">
                        <FontAwesomeIcon icon={faUsers} />
                        <label className={`${menu.isOpen ? 'open' : ''}`}>Users</label>
                    </Link>
                    {menu.isOpen && <Link to="users/add"><FontAwesomeIcon icon={faAdd} /></Link>}
                </div>
            </div>
            <div className='links'>
                <div onClick={() => setActive(2)} className={`${active === 2 ? 'active' : ''} sidebar-link `}>
                    <Link to="Categories">
                        <FontAwesomeIcon icon={faTable} />
                        <label className={`${menu.isOpen ? 'open' : ''}`}>Categories</label>
                    </Link>
                    {menu.isOpen && <Link to="Categories/add"><FontAwesomeIcon icon={faAdd} /></Link>}
                </div>
            </div>
            <div className='links'>
                <div onClick={() => setActive(3)} className={`${active === 3 ? 'active' : ''} sidebar-link `}>
                    <Link to="products">
                        <FontAwesomeIcon icon={faProductHunt} />
                        <label className={`${menu.isOpen ? 'open' : ''}`}>Products</label>
                    </Link>
                    {menu.isOpen && <Link to="product/add"><FontAwesomeIcon icon={faAdd} /></Link>}
                </div>
            </div>
        </div>
    );
}
