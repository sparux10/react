import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './form.css'
import { faX } from '@fortawesome/free-solid-svg-icons'

import {Edit} from '../../Context/EditContex'
import { useContext } from 'react'

export default function Form({ firstName, lastName, email, handleFirstNameChange, handleLastNameChange, handleEmailChange, handleSubmit }) {

    
    
    const edit = useContext(Edit)
    const close = edit.close
    const setclose = edit.setClose

    return (
        <div className="abslute-area" style={{display:`${close ? 'flex' : 'none' }`}}>
        <div className="user_profile_form">
            <span className='close' onClick={()=>setclose(false)} ><FontAwesomeIcon icon={faX} /></span>
            <h1>Edit Your Information</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="First Name"
                    className="input_field"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder="Last Name"
                    className="input_field"
                />
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    className="input_field"
                />
                <button type="submit" className="submit_button">Update</button>
            </form>
        </div>
        </div>
    )
}
