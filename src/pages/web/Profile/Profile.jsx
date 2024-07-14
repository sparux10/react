/* eslint-disable react-hooks/exhaustive-deps */
import { Axios } from '../../../API/Axios'
import React, { useEffect, useState } from 'react'
import './profile.css'
import Lightnav from '../../../components/Navbar/Lightnav'
import UserProfile from './UserProfile';
import Form from '../../../components/Profile/Form';

export default function Profile() {

  const [formData, setFormData] = useState({
    city: '',
    country: '',
    phone_number: '',
    postal_code: '',
    street: '',
  });

  useEffect(() => {
    async function fun() {
      let response = await Axios.get('/address/')

      try {
        setFormData({
          ...formData,
          city: response.data[0].city,
          country: response.data[0].country,
          phone_number: response.data[0].phone_number,
          postal_code: response.data[0].postal_code,
          street: response.data[0].street,
        })
      } catch (err) {
        console.log(err)
      }
    }
    fun()
  }, [])


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  function handleSubmite() {
    const formdata1 = new FormData()
    formdata1.append("country", formData.country)
    formdata1.append("city", formData.city)
    formdata1.append("street", formData.street)
    formdata1.append("phone_number", formData.phone_number)
    formdata1.append("postal_code", formData.postal_code)
    //Axios.put('/address/update/', formdata1)
      //.then(data => console.log(data))
  }



  return (
    <div>
      <Lightnav />
      <div className="container">
        <UserProfile /> 
        
      </div>


      <form style={{ display: "none" }} onSubmit={handleSubmite}>

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone_number}
          onChange={handleChange}
        />

        <label htmlFor="postale-code">Postal Code:</label>
        <input
          type="text"
          id="postale-code"
          name="postale-code"
          value={formData.postal_code}
          onChange={handleChange}
        />

        <button type="submit">Update</button>

      </form>
    </div>
  )
}
