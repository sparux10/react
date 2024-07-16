import { useState, useEffect } from "react";
import Loading from "../../../components/loader/Loading";
import Notification from "../../../components/Notificate/Notification";
import { Axios } from "../../../API/Axios";

export default function Update() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [active, setActive] = useState(true);
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
                    setRole(response.data);
                }
            })
            .catch((err) => {
                if (isMounted) setError(err.message);
            });
        return () => { isMounted = false; };
    }, []);

    const addUser = async (e) => {
        e.preventDefault();
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
                is_active: active,
                role_id: role_id,
            });

            if (res.status === 201) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setChecked(false);
                setActive(true);
                setRoleID(null);
                setSuccess('Success');
            } else {
                setError("Failed to add the user.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoad(false);
            setDisable(false);
        }
    };

    const handleRoleChange = (e) => {
        setRoleID(e.target.value);
    };

    return (
        <div className="full-area">
            <form className="form-user" onSubmit={addUser}>
                <div>
                    <h3>Create User</h3>

                    <div className="form-row">
                        <label className="label">First Name:</label>
                        <input
                            className="input"
                            type="text"
                            value={first_name}
                            placeholder="First Name..."
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Last Name:</label>
                        <input
                            className="input"
                            type="text"
                            value={last_name}
                            placeholder="Last Name..."
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Email:</label>
                        <input
                            className="input"
                            type="email"
                            value={email}
                            placeholder="Email..."
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Password:</label>
                        <input
                            className="input"
                            type="password"
                            value={password}
                            placeholder="Password..."
                            required
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Role:</label>
                        <select
                            className="input"
                            value={role_id}
                            onChange={handleRoleChange}
                            required
                        >
                            <option disabled hidden value={null}>Select Role</option>
                            {role.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <label className="checkbox-label">Is Admin:</label>
                        <input
                            className="checkbox-container"
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="checkbox-label">Is Active:</label>
                        <input
                            className="checkbox-container"
                            type="checkbox"
                            checked={active}
                            onChange={() => setActive(!active)}
                        />
                    </div>

                    <button type="submit" disabled={disable}>Add</button>
                </div>
            </form>
            {load && <Loading />}
            {success ? <Notification message="Success" /> : error && <Notification message={error} />}
        </div>
    );
}
