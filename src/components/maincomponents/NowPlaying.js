import React, { useContext } from 'react'
import Context from '../ContextApi'

const NowPlaying = () => {
    const contextApi = useContext(Context);
    return (
        <h1>Now playing</h1>
    )
}

export default NowPlaying