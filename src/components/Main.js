import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Context from './ContextApi'
import MainSongs from './maincomponents/MainSongs';
import NowPlaying from './maincomponents/NowPlaying';
import Pomodoro from './Pomodoro';

const Main = () => {
    const contextApi = useContext(Context);

    return (
        <main className='flex flex-row bg-neutral-700 text-neutral-300'>
            <div className='w-full h-full'>
            <Routes>

                
                <Route path='/' exact element={<Pomodoro></Pomodoro>}></Route>
                {!contextApi.token ? 
                <></>
                : 
                <>
                <Route path='/nowplaying' element={<NowPlaying />} />

                {/* main songs is just playlist of liked songs */}
                <Route path='/mymusic' element={<MainSongs />} />

                {/* foreach playlist make link to specific playlist */}                
                </>
                }
            </Routes>
            </div>
        </main>
    )
}

export default Main