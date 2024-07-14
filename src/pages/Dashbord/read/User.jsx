import { useEffect, useState } from "react"
import { Axios } from "../../../API/Axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { faCheck, faEdit, faTrashCan, faX } from "@fortawesome/free-solid-svg-icons"

export default function User() {

    const [data, setData] = useState([])
    const [headq, setHeads] = useState([])
    const [valid, setvalid] = useState(0)

    useEffect(() => {
        Axios.get('/users')
        .then(data =>{ setData(data.data);setHeads(Object.keys(data.data[0]))})
            
    }, [valid])


    

    const thh = headq.map(item => item === "role_id" || <th>{item} </th> )


    const showdata = data.map((user, index) => (

        <tr key={index} className={`${(index + 1) % 2 === 0 ? 'even-row row' : 'odd-row row'}`} >
            <td>{index + 1}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.is_active ? <FontAwesomeIcon color="green" icon={faCheck} /> : <FontAwesomeIcon color="red" icon={faX} />}</td>
            <td>{user.is_admin ? <FontAwesomeIcon color="green" icon={faCheck} /> : <FontAwesomeIcon color="red" icon={faX} />}</td>
            <td>{user.last_login}</td>
            <td>{user.role} </td>
            <td>
                <Link to={`${user.id}`}>
                    <FontAwesomeIcon icon={faEdit} color='green' cursor={'pointer'} style={{ margin: "0 10px" }} />
                </Link>
                {!user.is_admin && <FontAwesomeIcon onClick={() => handleDelete(user.id)} icon={faTrashCan} color='orangered' cursor={'pointer'} style={{ margin: "0 10px" }} />} 
            </td>
        </tr>
    )) 

    console.log(data)

    async function handleDelete(id) {
        const isConfirm = window.confirm('are you sure ')
        if (isConfirm){
            try {
            const res = await Axios.delete(`/users/${id}`)
            console.log(res)
            setvalid(1)
        } catch (err) { console.log(err) }
        }
        
    }


    return (
        <div className="table_area">
            <table className="custom-table">
                <thead>
                    <tr className="header-row">
                        {thh}
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {showdata}
                </tbody>
            </table>
        </div>
    )
}
