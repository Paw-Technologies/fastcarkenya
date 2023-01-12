import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { MdCopyright, MdMail, MdPhone } from 'react-icons/md'

const Footer = () => {
    const [width, setWIdth] = useState(window.innerWidth)

    window.addEventListener('resize', ()=>{
        setWIdth(window.innerWidth)
    })
  if(width > 600)return (
    <footer>
        <div>
            <section>
                <h1>Contacts</h1>
                <a href=''>
                    <FaInstagram /> Instagram
                </a>
                <a href=''>
                    <FaFacebook /> Facebookr@fastcarke
                </a>
                <a href=''>
                    <MdMail /> support@fastcar.com
                </a>
            </section>
            <section>
                <h1>Available in: </h1>
                <a>Kenya</a>
                <a>Uganda</a>
                <a>Tanzania</a>
                <a>Zambia</a>
                <a>South Africa</a>
                <a>United Arab Emirates</a>
            </section>
        </div>
        <div>
            <h4>
                <MdCopyright />
                2018
                {/* Fastcar{new Date().getFullYear()} */}
            </h4>
        </div>
        
    </footer>
  )
}

export default Footer
