import { Axios } from "../../../API/Axios";
import { useState } from "react";
import Loading from "../../../components/loader/Loading";

import Notification from "../../../components/Notificate/Notification";


export default function AddProduct() {

    const [load, setLoad] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);



    const add = async (e) => {
        e.preventDefault();
        setDisable(true)
        setLoad(true);
        setError(null);

        try {
            const res = await Axios.post(`/products/`, { 

            });

            if (res.status === 201) {
                setSuccess('sucssess')
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
  return (


    
    <>
            <div className="full-area">
                <form className="form-user" onSubmit={add}>
                    <div>
                        <h3>Create Product</h3>

                        <button type="submit" disabled={disable}>Add</button>
                    </div>
                </form>
                {load && <Loading />}
                {success ? <Notification message={"success"} /> : error && <Notification message={error} />}
            </div>
        </>
  )
}
