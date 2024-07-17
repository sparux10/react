import { Axios } from "../../../API/Axios";
import { useEffect, useState } from "react";
import Loading from "../../../components/loader/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import Notification from "../../../components/Notificate/Notification";
import ColorSizeSelector from "../../../components/selector/ColorSizeSelectore"
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
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
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        Axios.get(`/products/${id}/`)
            .then(res => {
                const product = res.data;
                setCategoryName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setDiscount(product.discount);
                setBrand(product.brand);
                setRatings(product.ratings);
                setStock(product.stock);
                setCategory(product.category.id); // Assuming category is returned as an object with an id
                setSelectedImage(product.product_img); // Assuming product_img is the image URL
                setSelected(product.product_colors_sizes); // Assuming product_colors_sizes is an array of selected colors and sizes
    })
            .catch(err => console.log(err));
        
        Axios.get("/categories/")
            .then(data => setCategories(data.data))
            .catch(err => console.log(err));

        Axios.get("/colors/")
            .then(data => setColors(data.data))
            .catch(err => console.log(err));

        Axios.get("/sizes/")
            .then(data => setSizes(data.data))
            .catch(err => console.log(err));
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();
        setDisable(true);
        setLoad(true);
        setError(null);

        const productData = new FormData();
        productData.append('name', categoryName);
        productData.append('description', description);
        productData.append('price', price);
        productData.append('discount', discount);
        productData.append('brand', brand);
        productData.append('ratings', ratings);
        productData.append('stock', stock);
        productData.append('category', category);
        productData.append('product_colors_sizes', JSON.stringify(selected));
        productData.append('product_img', selectedImage);

        try {
            const res = await Axios.put(`/products/${id}/`, productData);
            console.log(res);
            if (res.status === 200) {
                setSuccess('Product updated successfully');
            } else {
                setError("Failed to update the product.");
            }
        } catch (err) {
            console.log(err);
            setError("Error updating the product.");
        } finally {
            setLoad(false);
            setDisable(false);
        }
    };

    const handleImageDelete = () => {
        setSelectedImage(null);
    };

    return (
        <div className="full-area">
            <form className="form-user" encType="multipart/form-data" onSubmit={updateProduct}>
                <div>
                    <h1>Update Product</h1>

                    <div className="form-row">
                        <label className="label">Name:</label>
                        <input
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
                        <select
                            className="input"
                            defaultValue={'select'}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option disabled hidden value={'select'}>Select Category</option>
                            {categories.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="img_area">
                        <div className="form_upload_button">
                            <input
                                type="file"
                                name="product_img"
                                accept="image/*"
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                id="fileInput"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="fileInput">
                                {selectedImage ? (
                                    <span><FontAwesomeIcon icon={faCheck} /> Selected</span>
                                ) : (
                                    <span><FontAwesomeIcon icon={faUpload} /> Select image</span>
                                )}
                            </label>
                        </div>
                        {selectedImage && (
                            <div className="selected-image">
                                <img width="150px" src={URL.createObjectURL(selectedImage)} alt="Selected" />
                                <div className="delete-image-button" onClick={handleImageDelete}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="form_selector">
                        <ColorSizeSelector colors={colors} sizes={sizes} selected={selected} setSelected={setSelected} />
                    </div>

                    <button type="submit" disabled={disable}>Add</button>
                </div>
            </form>
            {load && <Loading />}
            {success ? <Notification message="Success" /> : error && <Notification message={error} />}
        </div>
    );
}
