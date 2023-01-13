import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Context from './ContextApi'
import MainSongs from './maincomponents/MainSongs';
import NowPlaying from './maincomponents/NowPlaying';

const Main = () => {
    const contextApi = useContext(Context);

    return (
        <main className='flex flex-row bg-yellow-50'>
            {!contextApi.token ? 
            <></>
            : 
            <div>
                <Routes>
                    <Route path='/' exact element={<NowPlaying />} />
                    <Route path='/mymusic' element={<MainSongs />} />
                    {/* foreach playlist make link to specific playlist */}
                </Routes>
            </div>}
        </main>
    )
}

export default Main