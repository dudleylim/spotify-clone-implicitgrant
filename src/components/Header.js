import React, { useContext } from 'react'
import Context from './ContextApi'

const Header = () => {
    const contextApi = useContext(Context);

    return (
        <header className='bg-gray-700 flex flex-row justify-between p-2 text-gray-300'>
            <h1 className='font-bold text-3xl'>Logo</h1>
            {contextApi.token ? 
                <>
                    <button>Dropdown profile</button>     
                    <button className='' onClick={() => {contextApi.logout()}}>Logout</button>       
                </>
            :
                <a className='my-auto' href={`${contextApi.AUTH_ENDPOINT}?client_id=${contextApi.CLIENT_ID}&redirect_uri=${contextApi.REDIRECT_URI}&response_type=token&scope=${contextApi.SCOPE}`}>
                    <p>Login to spotify</p>
                </a>
            }
        </header>
    )
}

export default Header