import { useEffect, useState } from "react";
import { Axios } from "../../../API/Axios";
import { useParams } from "react-router-dom";

export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        Axios.get(`/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Details</h2>
            <ul>
                {Object.keys(user).map((key, index) => (
                    <li key={index}>
                        <strong>{key}: </strong>{user[key]}
                    </li>
                ))}
            </ul>
        </div>
    );
}
