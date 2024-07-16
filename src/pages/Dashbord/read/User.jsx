import { useEffect, useState } from "react";
import { Axios } from "../../../API/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faCheck, faEdit, faEye, faTrashAlt, faX } from "@fortawesome/free-solid-svg-icons";


export default function User() {
    const [data, setData] = useState([]);
    
    const [valid, setValid] = useState(0);

    useEffect(() => {
        Axios.get('/users')
            .then(response => {
                setData(response.data);
                
            })
            .catch(error => console.error(error));
    }, [valid]);

    const handleDelete = async (id) => {
        const isConfirm = window.confirm('Are you sure you want to delete this user?');
        if (isConfirm) {
            try {
                await Axios.delete(`/users/${id}`);
                setValid(valid + 1); // تحديث القيمة لإعادة جلب البيانات
            } catch (error) {
                console.error(error);
            }
        }
    };


    const showData = data.map((user, index) => (
        <tr key={index} className={`${(index + 1) % 2 === 0 ? 'even-row row' : 'odd-row row'}`}>
            <td>{index + 1}</td>
            <td>{user.first_name}-{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.is_active ? <FontAwesomeIcon icon={faCheck} color="green" /> : <FontAwesomeIcon icon={faX} color="red" />}</td>
            <td>{user.is_admin ? <FontAwesomeIcon icon={faCheck} color="green" /> : <FontAwesomeIcon icon={faX} color="red" />}</td>
            <td>{user.role}</td>
            <td>
                <Link to={`${user.id}`}>
                    <FontAwesomeIcon icon={faEdit} color="green" cursor="pointer"  />
                </Link>
                {!user.is_admin && (
                    <FontAwesomeIcon
                        onClick={() => handleDelete(user.id)}
                        icon={faTrashAlt}
                        color="orangered"
                        cursor="pointer"
                    />
                )}
                <Link to={`details/${user.id}`} className="details-link">
                    <FontAwesomeIcon icon={faEye} color="blue" />
                </Link>
            </td>
        </tr>
    ));

    return (
        <div className="table_area">
            <table className="custom-table">
                <thead>
                    <tr className="header-row">
                        <th>id</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Is Active</th>
                        <th>Is Admin</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {showData}
                </tbody>
            </table>
        </div>
    );
}
