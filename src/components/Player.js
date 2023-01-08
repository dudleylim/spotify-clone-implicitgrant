import React, { useContext, useEffect, useState } from 'react'
import Context from './ContextApi';
import PlayerButton from './PlayerButton'
import { BsPlay, BsPause, BsShuffle, BsFillVolumeUpFill } from 'react-icons/bs';
import { MdSkipPrevious, MdSkipNext, MdOutlineRepeat, MdOutlineRepeatOne } from 'react-icons/md';

const Player = (props) => {
    const contextApi = useContext(Context);

    return (
        <footer className='bg-red-100 flex flex-row'>
            <div className='flex grow'>Album</div>
            
            <div className='flex flex-col grow-[2]'>
                <div className="flex flex-row">
                    <PlayerButton iconArg={<BsShuffle />}/>
                    <PlayerButton iconArg={<MdSkipPrevious />}/>
                    <PlayerButton functionArg={() => {contextApi.player.togglePlay()}} iconArg={<BsPlay />}/>
                    <PlayerButton iconArg={<MdSkipNext />}/>
                    <PlayerButton iconArg={<MdOutlineRepeat />}/>
                    <button onClick={() => { contextApi.player.pause() }}>hi</button>
                </div>
                <input type="range" name="" id="" />
                
            </div>
            
            <div className='flex grow'>
                <input type="range" name="" id="" />
            </div>
        </footer>
    )
}

export default Player