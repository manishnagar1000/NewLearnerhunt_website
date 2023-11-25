import React from 'react'
import Topbar from './Topbar'
import Footer from './Footer'
import { useRouter } from 'next/router'
import WhatsAppButton from '@/components/Whatsup'

// const pagesnothaveheader = ["/dashboard"]
// const pagesnothavefooter = ["/dashboard"]
const Layout = ({ children }) => {
    const router = useRouter();
    const {pathname}  = router

    return (
        
        <>
        {
              !pathname.startsWith('/adminportal')&&!pathname.startsWith('/leads')&&!pathname.startsWith('/ads/thankupageisbr')&&!pathname.startsWith('/ads/isbr')&&!pathname.startsWith('/edufest/2023')&&<Topbar />
        }
      <WhatsAppButton />
          
                {children}
                {
            !pathname.startsWith('/dashboard')&&!pathname.startsWith('/adminportal')&&!pathname.startsWith('/leads')&&!pathname.startsWith('/ads/thankupageisbr')&&!pathname.startsWith('/ads/isbr')&&<Footer />
        }
        </>
    )
}

export default Layout