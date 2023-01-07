import React from 'react'

const SidebarItem = ({children}) => {
    return (
        <div className='hover:bg-blue-100 py-4 px-2'>
            {children}
        </div>
    )
}

export default SidebarItem