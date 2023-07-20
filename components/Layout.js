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
          <Topbar />
                {children}
                {
            !pathname.startsWith('/dashboard')&&<Footer />
        }
        </>
    )
}

export default Layout