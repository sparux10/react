import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './notif.css'
import { useState } from "react"
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Notification(props) {



  const [none, setnone] = useState('block');

  setTimeout(() => setnone('none'),5000)

    return (
      <>
        <div style={{ display: none, overflow: "hidden" }}>
          <div className='quiq_notif' >
            <p>{props.message}</p>
          </div>
        </div>
      </>
    )

  }

