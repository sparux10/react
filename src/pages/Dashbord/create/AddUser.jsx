import { Axios } from "../../../API/Axios";
import { useState, useEffect } from "react";
import Loading from "../../../components/loader/Loading";

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
    const [load, setLoad] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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

    const add = async (e) => {
        e.preventDefault();
        setDisable(true)
        setDisable(true);
        setLoad(true);
        setError(null);

        try {
            const res = await Axios.post(`/users/`, { 
                first_name, 
                last_name, 
                email, 
                password, 
                is_admin: checked, 
                is_active: active ,
                role_id: 3
            });

            if (res.status === 201) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setChecked(false);
                setActive(true);
                setSuccess('success')
            } else {
                setError("Failed to add the user.");
            }
        } catch (err) {
            setError(err.message);
            setError(err)
        } finally {
            setLoad(false);
            setDisable(false);
        }
    };

    function handleChangerole(e){
        setRoleID(e.target.value)
        console.log(e.target.value)
    }

    return (
        <>
            <div className="full-area">
                <form className="form-user" onSubmit={add}>
                    <div>
                        <h3>Create User</h3>

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
                        <input className="input" type="password"  value={password || ""} placeholder="Password..." required min={8} minLength={8}
                            onChange={(e) => setPassword(e.target.value)} />
                            
                        <select name="roles" width={300} defaultValue={'select'} onChange={handleChangerole}>
                            <option disabled hidden value={'select'} >Select to Change Role</option>
                            {role.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                        </select>

                        <div className="checkbox-label"> Is Admin
                            <input className="checkbox-container" onChange={()=> setChecked(!checked)} type="checkbox"  />
                        </div>

                        <div className="checkbox-label"> Is Active
                            <input className="checkbox-container" onChange={()=>setActive(!active)} type="checkbox"  />
                        </div>
                        <button type="submit" disabled={disable}>Add</button>
                    </div>
                </form>
                {load && <Loading />}
                {success ? <Notification message={"success"} /> : error && <Notification message={error} />}
            </div>
        </>
    );
}
