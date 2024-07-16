import { useState } from "react";
import Loading from "../../../components/loader/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Notification from "../../../components/Notificate/Notification";
import { Axios } from "../../../API/Axios";

export default function AddCategory() {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [load, setLoad] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const addCategory = async (e) => {
        e.preventDefault();
        setDisable(true);
        setLoad(true);
        setError(null);

        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("description", description);
        formData.append("category_img", selectedImage);

        try {
            const res = await Axios.post(`/categories/`, formData);
            console.log(res);
            if (res.status === 201) {
                setSuccess('Success');
            } else {
                setError("Failed to add the category.");
            }
        } catch (err) {
            console.log(err);
            setError("Error");
        } finally {
            setLoad(false);
            setDisable(false);
        }
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleImageDelete = () => {
        setSelectedImage(null);
    };

    return (
        <div className="full-area">
            <form className="form-user" encType="multipart/form-data" onSubmit={addCategory}>
                <div>
                    <h3>Create Category</h3>

                    <div className="form-row">
                        <label className="label">Name:</label>
                        <input
                            className="input"
                            type="text"
                            value={categoryName}
                            placeholder="Category Name..."
                            required
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Description:</label>
                        <input
                            className="input"
                            type="text"
                            value={description}
                            placeholder="Description..."
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="img_btns">
                        {selectedImage && (
                            <div className="selected-image">
                                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                                <button className="delete-image-button" onClick={handleImageDelete}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="fileInput"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="fileInput" className="upload_button">
                            {selectedImage ? (
                                <span><FontAwesomeIcon icon={faCheck} /> Selected</span>
                            ) : (
                                <span><FontAwesomeIcon icon={faUpload} /> Select image</span>
                            )}
                        </label>
                    </div>

                    <button type="submit" disabled={disable}>Add</button>
                </div>
            </form>
            {load && <Loading />}
            {success ? <Notification message="Success" /> : error && <Notification message={error} />}
        </div>
    );
}
