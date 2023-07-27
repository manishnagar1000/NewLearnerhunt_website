import React from 'react'
import Topbar from './Topbar'
import Footer from './Footer'
import { useRouter } from 'next/router'
// const pagesnothaveheader = ["/dashboard"]
// const pagesnothavefooter = ["/dashboard"]
const Layout = ({ children }) => {
    const router = useRouter();
    const {pathname}  = router
    const pagesnothaveheader = ["/portal"]
    const pagesNotHaveFooter = [ "/dashboard","/portal"]
    return (
        
        <>
        {
            !pathname.startsWith('/portal')&&<Topbar />
        }
          
                {children}
                {
            !pathname.startsWith('/dashboard')&&!pathname.startsWith('/portal')&&<Footer />
        }
        </>
    )
}

export default Layout