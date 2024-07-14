import React from 'react'
import './lort.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
  return (
    <div className='loading'>
            <FontAwesomeIcon icon={faCircleNotch} color='white' size='3x' spin />
    </div>
  )
}
