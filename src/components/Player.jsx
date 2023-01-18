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
    const volume = useRef();

    // marquee stuff
    const songTitle = useRef();
    const songDiv = useRef();
    const [songTitleWidth, setSongTitleWidth] = useState(0);
    const [songDivWidth, setSongDivWidth] = useState(0);

    // resize observer for marquee
    // https://stackoverflow.com/questions/68629538/how-to-use-resizeobserver-to-check-only-bodys-width-change-in-javascript
    useEffect(() => {
        // const titleObserver = new ResizeObserver((entries) => {
        //     for (const entry of entries) {
        //         const width = entry.borderBoxSize?.[0].inlineSize;
        //         if (typeof width === 'number') {
        //             setSongTitleWidth(width)
        //         }
        //     }
        // });
        const divObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.borderBoxSize?.[0].inlineSize;
                if (typeof width === 'number') {
                    setSongDivWidth(width)
                }
            }
        });
        // titleObserver.observe(songTitle.current);
        divObserver.observe(songDiv.current);
    }, [])

    // checks for title width after song change
    useEffect(() => {
        setSongTitleWidth(songTitle.current?.scrollWidth);
    }, [contextApi.currentTrack])

    useEffect(() => {
        if (songTitle.current?.offsetWidth < songTitle.current?.scrollWidth) {
            setSongTitleWidth(songTitle.current?.scrollWidth);
        } else {
            setSongTitleWidth(songTitle.current?.offsetWidth);
        }
    }, [songDivWidth]);


    // custom toggle play
    const togglePlay = () => {
        if (contextApi.isPlaying) {
            contextApi.player.pause();
            contextApi.setIsPlaying(false);
        } else {
            contextApi.player.resume();
            contextApi.setIsPlaying(true);
        }
    }

    // initialize shuffle and repeat state
    const [isShuffling, setIsShuffling] = useState(false);
    const [repeatState, setRepeatState] = useState(0);
    useEffect(() => {
        if (contextApi.isSongReady) {
            contextApi.player.getCurrentState().then(state => {
                setIsShuffling(state.shuffle);
                setRepeatState(state.repeat_mode);
                console.log(state.shuffle);
                console.log(state.repeat_mode);
            })
        }
    }, [contextApi.player, contextApi.isSongReady])

    // shuffle toggle
    const toggleShuffle = () => {

    }

    // repeat toggle
    const toggleRepeat = () => {

    }


    // progress bar stuff
    const [currentProgress, setCurrentProgress] = useState(0);
    let progressSeconds = Math.trunc((currentProgress % 60000) / 1000);
    let progressMinutes = Math.floor(currentProgress / 60000);

    // match progress with actual progress
    useEffect(() => {
        setCurrentProgress(contextApi.updatedProgress)
    }, [contextApi.updatedProgress])

    // update progress while playing
    useEffect(() => {
        if (contextApi.isPlaying) {
            const interval = setInterval(() => {
                setCurrentProgress(currentProgress + 1000);
                // console.log(currentProgress);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [contextApi.isPlaying, currentProgress])

    // move progress bar
    useEffect(() => {
        progress.current.value = (currentProgress / contextApi.currentDuration) * 100
    }, [currentProgress, contextApi.currentDuration])

    // seek progress bar
    const onSeek = () => {
        console.log('seeking');
    }
    
    // check if player is playing after song changes
    useEffect(() => {
        if (contextApi.isSongReady) {
            contextApi.player.getCurrentState().then(state => {
                if (state.paused === true) {
                    contextApi.setIsPlaying(false);
                    console.log(state.paused)
                } else {
                    contextApi.setIsPlaying(true);
                }
            })
        }
    }, [contextApi.currentTrack, contextApi.isSongReady, contextApi])

    // changing volume
    const onVolumeChange = () => {
        contextApi.player.setVolume(volume.current.value / 100);
    }

    return (
        <footer className='bg-neutral-800 text-gray-200 flex flex-row pr-4'>
            <div className='flex flex-row grow basis-0'>
                <img src={contextApi.currentTrack.album.images[0].url} alt="" />
                
                <div ref={songDiv} className='flex flex-col justify-center overflow-x-hidden whitespace-nowrap gap-2 pl-1 basis-0 grow'>
                    <p ref={songTitle} className={`font-bold text-xl inline-block ${songTitleWidth > songDivWidth ? 'animate-marquee' : ''} w-full`}>{contextApi.currentTrack.name ? contextApi.currentTrack.name : "---"}</p>
                    <p className='overflow-x-hidden whitespace-nowrap'>{contextApi.currentTrack.artists[0].name ? contextApi.currentTrack.artists[0].name : "---"}</p>
                    {/* <p>{songDiv.current ? (songTitleWidth + " " + songDivWidth) : ""}</p> */}
                </div>
            </div>
            
            <div className='flex flex-col grow justify-center gap-4 basis-0'>
                <div className="flex flex-row justify-center gap-4">
                    <PlayerButton functionArg={() => {console.log(contextApi.currentTrack)}} iconArg={<BsShuffle size={20} />}/>
                    <PlayerButton functionArg={() => {contextApi.player.previousTrack()}} iconArg={<MdSkipPrevious size={23} />}/>
                    { contextApi.isPlaying ?
                    <PlayerButton functionArg={() => {togglePlay()}} iconArg={<BsPause size={23} />}/>
                    :
                    <PlayerButton functionArg={() => {togglePlay()}} iconArg={<BsPlay size={23} />}/>
                    }
                    <PlayerButton functionArg={() => {contextApi.player.nextTrack()}} iconArg={<MdSkipNext size={23} />}/>
                    <PlayerButton functionArg={() => {console.log(songDiv.current)}} iconArg={<MdOutlineRepeat size={20} />}/>
                </div>
                <div className="flex flex-row justify-between text-center">
                    <p className='basis-0 grow'>{progressMinutes < 10 ? "0" + progressMinutes : progressMinutes}:{progressSeconds < 10 ? "0" + progressSeconds : progressSeconds}</p>
                    <input className='basis-0 grow-[2]' ref={progress} type="range" name="progress" id="progress" 
                    onChange={
                        () => {
                            onSeek();
                        }
                    } 
                    onMouseDown={
                        () => {
                            if (contextApi.isPlaying) {
                                togglePlay();
                            }
                        }
                    }
                    onMouseUp={
                        () => {
                            contextApi.player.seek((contextApi.currentDuration * progress.current.value / 100));
                            console.log((contextApi.currentDuration * progress.current.value / 100));
                        }
                    }
                    />
                    <p className='basis-0 grow'>{contextApi.durationMinutes < 10 ? "0" + contextApi.durationMinutes : contextApi.durationMinutes}:{contextApi.durationSeconds < 10 ? "0" + contextApi.durationSeconds : contextApi.durationSeconds}</p>
                </div>
                
            </div>
            
            <div className='flex grow items-center justify-end basis-0'>
                <BsFillVolumeUpFill />
                <input ref={volume} type="range" name="volume" id="volume" onChange={onVolumeChange} />
            </div>
        </footer>
    )
}

export default Player