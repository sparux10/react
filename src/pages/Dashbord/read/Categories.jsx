import { useEffect, useState } from "react";
import { Axios } from "../../../API/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Products() {
    const [data, setData] = useState([]); // ضمان أن النتائج تكون مصفوفة فارغة في البداية
    const [valid, setValid] = useState(0);

    useEffect(() => {
        Axios.get('/categories')
            .then(response => { setData(response.data); })
            .catch(error => console.error('Error fetching data:', error));
    }, [valid]);


    const showdata = data.map((item, index) => (
        <tr key={index} className={`${(index + 1) % 2 === 0 ? 'even-row row' : 'odd-row row'}`}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.categoury_img}</td>
            <td>{item.user}</td>
            <td>
                <Link to={`${item.id}`}>
                    <FontAwesomeIcon icon={faEdit} color='green' cursor={'pointer'} style={{ margin: "0 10px" }} />
                </Link>
                    <FontAwesomeIcon
                        onClick={() => handleDelete(item.id)}
                        icon={faTrashCan}
                        color='orangered'
                        cursor={'pointer'}
                        style={{ margin: "0 10px" }}
                    />

            </td>
        </tr>
    ));

    async function handleDelete(id) {
        const isConfirm = window.confirm('Are you sure?');
        if (isConfirm) {
            try {
                const res = await Axios.delete(`/products/${id}`);
                console.log(res);
                setValid(valid + 1); // تحديث الحالة لإعادة تحميل البيانات
            } catch (err) {
                console.log(err);
            }
        }
    }

    console.log(data);

    return (
        <div className="table_area">
            <table className="custom-table">
                <thead>
                    <tr className="header-row">
                        <th>id</th>
                        <th>name</th>
                        <th>description</th>
                        <th>img</th>
                        <th>created by</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {showdata}
                </tbody>
            </table>
        </div>
    );
}
