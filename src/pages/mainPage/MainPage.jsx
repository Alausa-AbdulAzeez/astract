import React from 'react'
import Footer from '../../components/footer/Footer'
import Hero from '../../components/hero/Hero'
import Topbar from '../../components/topBar/Topbar'
import './mainPage.scss'

function App() {
  return (
    <div className='mainAndFooterWrapper'>
      <div className='main'>
        <Topbar />
        <Hero />
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )
}

export default App
