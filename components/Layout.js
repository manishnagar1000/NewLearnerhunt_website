import React from 'react'
import Topbar from './Topbar'
import Footer from './Footer'
import { useRouter } from 'next/router'
// const pagesnothaveheader = ["/dashboard"]
// const pagesnothavefooter = ["/dashboard"]
const Layout = ({ children }) => {
    const router = useRouter();
    const {pathname}  = router

    return (
        
        <>
        {
              !pathname.startsWith('/adminportal')&&!pathname.startsWith('/leads')&&<Topbar />
        }
          
                {children}
                {
            !pathname.startsWith('/dashboard')&&!pathname.startsWith('/adminportal')&&!pathname.startsWith('/leads')&&<Footer />
        }
        </>
    )
}

export default Layout