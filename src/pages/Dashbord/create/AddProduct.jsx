import { Axios } from "../../../API/Axios";
import { useState } from "react";
import Loading from "../../../components/loader/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUpload } from '@fortawesome/free-solid-svg-icons';
import Notification from "../../../components/Notificate/Notification";


export default function AddProdut() {

    const [categoryName, setCategoryName] = useState("");
    const [Description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [load, setLoad] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);



    const add = async (e) => {
        e.preventDefault();
        setDisable(true)
        setLoad(true);
        setError(null);

        const formdata = new FormData()
        formdata.append("name", categoryName)
        formdata.append("description", Description)
        formdata.append("categoury_img", selectedImage)

        try {
            const res = await Axios.post(`/categories/`, formdata);
            console.log(res)

            if (res.status === 201) {
                setSuccess('sucssess')
            } else {
                setError("Failed to add the user.");
            }
        } catch (err) {
            console.log(err)
            setError("err")
        } finally {
            setLoad(false);
            setDisable(false);
        }
    };
    // 'name', 'description', 'price', 'discount', 'brand', 'ratings', 'stock', 'product_img', 'category', 'created_at', 'user', 'color_sizes']

    const handleImageChange = (e) => {
        setSelectedImage((e.target.files[0]));
    };
    return (
        <>
            <div className="full-area">
                <form className="form-user" encType="multipart/form-data" onSubmit={add}>

                    <div>
                        <h3>Create Product</h3>

                        <div className="label">Name : </div>
                        <input className="input" type="text" value={categoryName || ""} placeholder="CategoryName..." required
                            onChange={(e) => setCategoryName(e.target.value)} />

                        <div className="label">Description : </div>
                        <input className="input" type="text" value={Description || ""} placeholder="Description..." required
                            onChange={(e) => setDescription(e.target.value)} />

                        <div className="label">price : </div>
                        <input className="input" type="number" defaultValue={0} value={Description || ""} required
                            onChange={(e) => setDescription(e.target.value)} />

                        <div className="label">Discount : </div>
                        <input className="input" type="number" defaultValue={0} value={Description || ""} required
                            onChange={(e) => setDescription(e.target.value)} />

                        <div className="label">brand : </div>
                        <input className="input" type="text" value={Description || ""} placeholder="Brand name..."
                            onChange={(e) => setDescription(e.target.value)} />

                        <div className="label">ratings : </div>
                        <input className="input" type="number" defaultValue={0} value={Description || ""} required
                            onChange={(e) => setDescription(e.target.value)} />

                        <div className="label">stock : </div>
                        <input className="input" type="number" defaultValue={0} value={Description || ""} required
                            onChange={(e) => setDescription(e.target.value)} />
                            
                        <div className="label">Categori : </div>
                        <input className="input" type="number" defaultValue={0} value={Description || ""} required
                            onChange={(e) => setDescription(e.target.value)} />

                        <div className='img_btns'>
                            <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput" style={{ display: 'none' }} />
                            <label htmlFor="fileInput" className="upload_button">
                                {selectedImage ? <span><FontAwesomeIcon icon={faCheck} /> Selected  </span> : <span> <FontAwesomeIcon icon={faUpload} /> Selecte iamge </span>}
                            </label>
                        </div>
                        {/* selectedImage && (
                            <img style={{width:"100%"}} src={selectedImage} alt="Selected" />
                        ) */}
                        <button type="submit" disabled={disable}>Add</button>
                    </div>
                </form>
                {load && <Loading />}
                {success ? <Notification message={"success"} /> : error && <Notification message={error} />}
            </div>
        </>
    )
}

