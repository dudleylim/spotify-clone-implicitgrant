import React from 'react'
import { Link } from 'react-router-dom'

const SidebarItem = ({children, link}) => {
    return (
        <Link to={link} className='hover:bg-blue-100 py-4 px-2 hover:cursor-pointer'>
            {children}
        </Link>
    )
}

export default SidebarItem