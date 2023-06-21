import React from 'react'
import Topbar from './Topbar'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Topbar />
                {children}
            
            <Footer />
        </>
    )
}

export default Layout