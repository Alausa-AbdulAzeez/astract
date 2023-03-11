import React from 'react'
import './topbar.scss'
import Logo from '../../utils/images/hernaLogo.png'
import { RiArrowDownSFill } from 'react-icons/ri'

const Topbar = () => {
  return (
    <div className='topbar'>
      <ul>
        <li>
          <img src={Logo} alt='logo' className='logoImg' />
        </li>
        <li>ABOUT US</li>
        <li>
          OUR COMMUNITIES
          <span>
            <RiArrowDownSFill />
          </span>
        </li>
        <li>
          ELECTION DATA
          <span>
            <RiArrowDownSFill />
          </span>
        </li>
        <li>E-BUDDY</li>
        <li>VEO PLATFORM</li>
        <li>LOGIN</li>
        <li className='signUpBtn'>SIGN UP</li>
      </ul>
    </div>
  )
}

export default Topbar
