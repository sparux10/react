import { Axios } from "../../../API/Axios";
import { useEffect, useState } from "react";
import Loading from "../../../components/loader/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUpload } from '@fortawesome/free-solid-svg-icons';
import Notification from "../../../components/Notificate/Notification";
import ColorSizeSelector from "../../../components/selector/ColorSizeSelectore"

export default function AddProduct() {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [brand, setBrand] = useState("");
    const [ratings, setRatings] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [load, setLoad] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [categories, setCategories] = useState([]);

    const [selected, setSelected] = useState([]);
    const [colors, setcolors] = useState([]);
    const [sizes, setSizes] = useState([]);


    useEffect(() => {
        Axios.get("/categories/")
            .then(data => setCategories(data.data))
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        Axios.get("/colors/")
            .then(data => setcolors(data.data))
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        Axios.get("/sizes/")
            .then(data => setSizes(data.data))
            .catch(err => console.log(err));
    }, []);

    const addProduct = async (e) => {
        e.preventDefault();
        setDisable(true);
        setLoad(true);
        setError(null);

        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("discount", discount);
        formData.append("brand", brand);
        formData.append("ratings", ratings);
        formData.append("stock", stock);
        formData.append("category", category);
        formData.append("product_colors_sizes", selected);
        //formData.append("product_img", selectedImage);

        try {
            const res = await Axios.post(`/products/`, formData);
            console.log(res);

            if (res.status === 201) {
                setSuccess('Success');
            } else {
                setError("Failed to add the product.");
            }
        } catch (err) {
            console.log(err);
            setError("Error");
        } finally {
            setLoad(false);
            setDisable(false);
        }
    };

    console.log(selected)

    return (
        <div className="full-area">
            <form className="form-user" encType="multipart/form-data" onSubmit={addProduct}>
                <div>
                    <h3>Create Product</h3>

                    <div className="form-row">
                        <label className="label">Name:</label>
                        <input
                            width={50}
                            className="input"
                            type="text"
                            value={categoryName}
                            placeholder="Product Name..."
                            required
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Description:</label>
                        <textarea
                            className="input"
                            type="text"
                            value={description}
                            placeholder="Description..."
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Price:</label>
                        <input
                            className="input"
                            type="number"
                            value={price}
                            required
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Discount:</label>
                        <input
                            className="input"
                            type="number"
                            value={discount}
                            required
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Brand:</label>
                        <input
                            className="input"
                            type="text"
                            value={brand}
                            placeholder="Brand name..."
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Ratings:</label>
                        <input
                            className="input"
                            type="number"
                            value={ratings}
                            required
                            onChange={(e) => setRatings(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Stock:</label>
                        <input
                            className="input"
                            type="number"
                            value={stock}
                            required
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label className="label">Category:</label>
                        <select name="roles" width={300} defaultValue={'select'} onChange={(e)=>setCategory(e.target.value)}>
                            <option disabled hidden value={'select'} >Select to Change Role</option>
                            {categories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                        </select>
                    </div>

                    <div className='img_btns'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedImage(e.target.files[0])}
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
                <ColorSizeSelector colors={colors} sizes={sizes} selected={selected} setSelected={setSelected} />
            </form>
            {load && <Loading />}
            {success ? <Notification message="Success" /> : error && <Notification message={error} />}
        </div>
    );
}
