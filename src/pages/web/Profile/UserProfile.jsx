import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Axios } from '../../../API/Axios';
import { baseURL } from '../../../API/api'
import picture from '../../../assets/images.png'
import Form from '../../../components/Profile/Form';
import { Edit } from '../../../Context/EditContex'

const UserProfile = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(picture)
  const [valid, setValid] = useState(0)
  const [valid2, setValid2] = useState(0)


  useEffect(() => {
    async function p_img() {
      try {
        await Axios.get('/profile-img/')
          .then(data => setData(data.data.profile_image))
      } catch (err) { console.log(err) }
    }
    p_img()
  }, [valid])

  const profileURL = baseURL + data

  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    setSelectedImage(newImage);
  };

  const handleImageUpload = async () => {
    setIsLoading(true);

    if (!selectedImage) {
      console.log("no selected img")
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
      const response = await Axios.put('/profile-img/update/', formData);
      setSelectedImage(null);
      console.log('Image upload successful:', response.data);
      setValid(1)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };
  
  const edit = useContext(Edit)
  const setclose = edit.setClose

  useEffect(() => {
    async function p_img() {
      try {
        await Axios.get('/user-info/')
          .then(data => {
            setFirstName(data.data.first_name)
            setLastName(data.data.last_name)
            setEmail(data.data.email)
          })
      } catch (err) { console.log(err) }
    }
    p_img()
  }, [valid2])

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('first_name',firstName)
    formdata.append('last_name',lastName)
    formdata.append('email',email)

    try{
      await Axios.put('user/update/', formdata)
      .then(data => console.log(data))
      setValid2(1)
    }catch(err){ console.log(err)}
}


  return (
    <>
      <div className="user_profile">
        <div className="image_section">
          <img src={profileURL} alt="Profile" />
          <div className='img_btns'>
            <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput" style={{ display: 'none' }} />
            <label htmlFor="fileInput" className="upload_button">
              {selectedImage ? <span><FontAwesomeIcon icon={faCheck} /> Selected  </span> : <span> <FontAwesomeIcon icon={faUpload} /> Selecte iamge </span>}
            </label>
            <button onClick={handleImageUpload} disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Update Image'}
            </button>
          </div>
        </div>
        <div className="info_section">

          <label htmlFor=""><h4>First Name :</h4> {firstName} </label>
          <label htmlFor=""> <h4>Last Name :</h4> {lastName} </label>
          <label htmlFor=""> <h4> Email :</h4> {email} </label>
          <button onClick={() => setclose(true)} className='edit'>Edit <FontAwesomeIcon size='sm' icon={faPen} /> </button>
        </div>
      </div>
      {edit.close && <Form
        firstName={firstName}
        lastName={lastName}
        email={email}
        handleEmailChange={handleEmailChange}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
        handleSubmit={handleSubmit}
      />}
    </>
  );
};

export default UserProfile;
