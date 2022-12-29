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
                <h1>FAQs</h1>
            </section>
        </div>
        <div>
            <h4>
                <MdCopyright />
                Fastcar{new Date().getFullYear()}
            </h4>
        </div>
        
    </footer>
  )
}

export default Footer
