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
              !pathname.startsWith('/adminportal')&&<Topbar />
        }
          
                {children}
                {
            !pathname.startsWith('/dashboard')&&!pathname.startsWith('/adminportal')&&<Footer />
        }
        </>
    )
}

export default Layout