import React, { useContext } from 'react'
import Context from '../ContextApi'

const NowPlaying = () => {
    const contextApi = useContext(Context);
    return (
        <section className=''>
            Now playing
        </section>
    )
}

export default NowPlaying