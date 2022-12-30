import React, { useContext } from 'react'
import Context from './ContextApi'
import Sidebar from './Sidebar';

const Main = () => {
    const contextApi = useContext(Context);

    return (
        <main className='flex flex-row'>
            <Sidebar />
            {!contextApi.token ? 
            <a href={`${contextApi.AUTH_ENDPOINT}?client_id=${contextApi.CLIENT_ID}&redirect_uri=${contextApi.REDIRECT_URI}&response_type=token`}>
                Login to spotify
            </a> 
            : 
            <div>
                <h1>{contextApi.token}</h1>
            </div>}
        </main>
    )
}

export default Main