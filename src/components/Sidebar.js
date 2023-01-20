import React from 'react'
import Context from './ContextApi'
import SidebarItem from './SidebarItem'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineSearch } from 'react-icons/ai'


const Sidebar = () => {

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <aside className='flex flex-col'>
            <div className=''>
                <button className='p-4 h-max bg-slate-300 block'>
                    <RxHamburgerMenu size={25}/>
                </button>
            </div>

            <form onSubmit={handleSearch} className='flex flex-row justify-between py-4 px-2'>
                    <input type="text" name="search" id="search" placeholder='Search...' />
                    <button type='submit'><AiOutlineSearch /></button>
            </form>


            <SidebarItem link={'/'}>
                Now Playing
            </SidebarItem>

            <SidebarItem link={'/mymusic'}>
                Liked Songs
            </SidebarItem>

            <hr />

            <SidebarItem>
                Playlists
            </SidebarItem>

        </aside>
    )
}

export default Sidebar