import React, { useContext, useEffect, useState, useRef } from 'react'
import Context from './ContextApi';
import PlayerButton from './PlayerButton'
import { BsPlay, BsPause, BsShuffle, BsFillVolumeUpFill } from 'react-icons/bs';
import { MdSkipPrevious, MdSkipNext, MdOutlineRepeat, MdOutlineRepeatOne } from 'react-icons/md';

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

const Player = (props) => {
    const contextApi = useContext(Context);

    const progress = useRef();

    return (
        <footer className='bg-red-100 flex flex-row pr-4'>
            <div className='flex flex-row grow'>
                <img src={contextApi.currentTrack.album.images[0].url} alt="" />
                <div className='flex overflow-x-hidden'>
                    <div className=''>
                        <h1 className='overflow-x-hidden whitespace-nowrap'>{contextApi.currentTrack.name}</h1>
                        <p className='overflow-x-hidden whitespace-nowrap'>{contextApi.currentTrack.artists[0].name}</p>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col grow justify-center gap-4'>
                <div className="flex flex-row justify-around">
                    <PlayerButton functionArg={() => {console.log(contextApi.currentTrack)}} iconArg={<BsShuffle size={25} />}/>
                    <PlayerButton functionArg={() => {}} iconArg={<MdSkipPrevious size={25} />}/>
                    <PlayerButton functionArg={() => {contextApi.player.togglePlay()}} iconArg={<BsPlay size={25} />}/>
                    <PlayerButton functionArg={() => {}} iconArg={<MdSkipNext size={25} />}/>
                    <PlayerButton functionArg={() => {}} iconArg={<MdOutlineRepeat size={25} />}/>
                </div>
                <input  ref={progress} type="range" name="" id="" />
                
            </div>
            
            <div className='flex grow items-center justify-end'>
                <BsFillVolumeUpFill />
                <input type="range" name="" id="" />
            </div>
        </footer>
    )
}

export default Player