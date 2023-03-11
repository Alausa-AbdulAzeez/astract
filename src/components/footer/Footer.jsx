/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { RiInstagramFill, RiTwitterFill, RiWhatsappFill } from 'react-icons/ri'
import Logo from '../../utils/images/mainHernaLogo.png'

import './footer.scss'

const Footer = () => {
  return (
    <div className='footerWrapper'>
      <div className='col1'>
        <img src={Logo} alt='logo' className='footerHernaLogo' />
        <p>Isale Eko Avenue, Dolphin Estate, Ikoyi, Lagos, Nigeria</p>
        <p>© 2022 Hernalytics</p>
      </div>
      <div className='col2'>
        <p>About</p>
        <p>Our Story</p>
        <p>Blog</p>
        <p>About Hernalytics</p>
        <p>Videos</p>
      </div>
      <div className='col3'>
        <p>Support</p>
        <p>FAQs</p>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
      </div>
      <div className='col4'>
        <p>Let's chat</p>
        <p>hernalytics@gmail.com</p>
        <p>+234 801 234 5678</p>
        <div className='footerIconsWrapper'>
          <div className='instaWrapper iconWrapper'>
            <RiInstagramFill className='icon' />
          </div>
          <div className='twitterWrapper iconWrapper'>
            <RiTwitterFill className='icon' />
          </div>
          <div className='whatsappWrapper iconWrapper'>
            <RiWhatsappFill className='icon' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
