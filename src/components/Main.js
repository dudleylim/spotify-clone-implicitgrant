import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Context from './ContextApi'
import MainSongs from './maincomponents/MainSongs';
import NowPlaying from './maincomponents/NowPlaying';

const Main = () => {
    const contextApi = useContext(Context);

    return (
        <main className='flex flex-row bg-neutral-600 text-neutral-300'>
            {!contextApi.token ? 
            <></>
            : 
            <div>
                <Routes>
                    <Route path='/' exact element={<NowPlaying />} />

                    {/* main songs is just playlist of liked songs */}
                    <Route path='/mymusic' element={<MainSongs />} />
                    
                    {/* foreach playlist make link to specific playlist */}
                </Routes>
            </div>}
        </main>
    )
}

export default Main