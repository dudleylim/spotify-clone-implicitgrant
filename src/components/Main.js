import React, { useContext } from 'react'
import Context from './ContextApi'

const Main = () => {
    const contextApi = useContext(Context);

    return (
        <main className='flex flex-row bg-yellow-50'>
            {!contextApi.token ? 
            <></>
            : 
            <div>
                <h1>{contextApi.token}</h1>
                
            </div>}
        </main>
    )
}

export default Main