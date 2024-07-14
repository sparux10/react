import { Axios } from "../../../API/Axios";
import { useState, useEffect } from "react";
import Loading from "../../../components/loader/Loading";
import { useParams } from 'react-router-dom';
import Notification from "../../../components/Notificate/Notification";

export default function Update() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(null);
    const [active, setActive] = useState(null);
    const [role, setRole] = useState([]);
    const [role_id, setRoleID] = useState(null);
    const [instanterole, setinstanterole] = useState("");
    const [load, setLoad] = useState(false);
    const [disable, setDisable] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;
        Axios.get(`/users/${id}`)
            .then((response) => {
                console.log(response.data)
                if (isMounted) {
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
                    setEmail(response.data.email);
                    setChecked(response.data.is_admin);
                    setActive(response.data.is_active);
                    setinstanterole(response.data.role)
                    setDisable(false);
                }
            })
            .catch((err) => {
                if (isMounted) setError(err.message);
            });
        return () => { isMounted = false; };
    }, [id]);

    useEffect(() => {
        let isMounted = true;
        Axios.get(`/role/`)
            .then((response) => {
                if (isMounted) {
                    setRole(response.data)
                }
            })
            .catch((err) => {
                if (isMounted) setError(err.message);
            });
        return () => { isMounted = false; };
    }, []);

    const handleChange = () => setChecked(!checked);
    const handleActiveChange = () => setActive(!active);

    const update = async (e) => {
        e.preventDefault();
        setLoad(true);
        setError(null);
        try {
            const res = await Axios.put(`/users/${id}/`, { first_name, last_name, email, is_admin: checked, is_active: active, role_id });
            console.log(res)
            if (res.status === 200) {
                setSuccess(res.data)
            } else {
                setError("Failed to update the user.");
            }
        } catch (err) {
            console.log(err)
            setError(err.message);
        } finally {
            setLoad(false);
        }
    };


    function handleChangerole(e){
        setRoleID(e.target.value)
    }
    console.log(role_id)

    return (
        <>
            <div className="full-area">
                <form className="form-user" onSubmit={update}>
                    <div>
                        <h3>Update User</h3>

                        <div className="label">First Name : </div>
                        <input className="input" type="text" value={first_name || ""} placeholder="First Name..." required
                            onChange={(e) => setFirstName(e.target.value)} />

                        <div className="label">Last Name : </div>
                        <input className="input" type="text" value={last_name || ""} placeholder="Last Name..." required
                            onChange={(e) => setLastName(e.target.value)} />

                        <div className="label">Email : </div>
                        <input className="input" type="email" value={email || ""} placeholder="Email..." required
                            onChange={(e) => setEmail(e.target.value)} />

                        <div className="label">Password:</div>
                        <input className="input" type="password" value={password || ""} placeholder="Password..." required min={8} minLength={8}
                            onChange={(e) => setPassword(e.target.value)} />
                        <p>instante role : {instanterole} </p>
                        <select name="roles" width={300} defaultValue={'select'} onChange={handleChangerole}>
                            <option disabled hidden value={'select'} >Select to Change Role</option>
                            {role.map((item, index) => <option key={item.index} value={item.id}>{item.name}</option>)}
                        </select>

                        <div className="checkbox-label"> Is Admin
                            <input className="checkbox-container" onChange={handleChange} type="checkbox" checked={checked} />
                        </div>

                        <div className="checkbox-label"> Is Active
                            <input className="checkbox-container" onChange={handleActiveChange} type="checkbox" checked={active} />
                        </div>
                        <button type="submit" disabled={disable}>Update</button>
                    </div>
                </form>
                {load && <Loading />}
                {success ? <Notification message={"success"} /> : error && <Notification message={error} />}
            </div>
        </>
    );
}
