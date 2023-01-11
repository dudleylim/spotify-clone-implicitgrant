import React, { useContext, useEffect, useState } from 'react'
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
/*
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    useEffect(() => {

        if (contextApi.token !== "") {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
    
            document.body.appendChild(script);
    
            window.onSpotifyWebPlaybackSDKReady = () => {
    
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: cb => { cb(contextApi.token); },
                    volume: 0.5
                });
    
                setPlayer(player);
    
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });
    
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
    
                player.addListener('player_state_changed', ( state => {
    
                    if (!state) {
                        return;
                    }
    
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);
    
                    player.getCurrentState().then( state => { 
                        (!state)? setActive(false) : setActive(true) 
                    });
    
                }));
    
                player.connect();
    
            };
        }

        
    }, [contextApi.token]);
*/

    return (
        <footer className='bg-red-100 flex flex-row'>
            <div className='flex grow'>Album</div>
            
            <div className='flex flex-col grow-[2]'>
                <div className="flex flex-row">
                    <PlayerButton functionArg={() => {}} iconArg={<BsShuffle />}/>
                    <PlayerButton iconArg={<MdSkipPrevious />}/>
                    <PlayerButton functionArg={() => {contextApi.player.togglePlay()}} iconArg={<BsPlay />}/>
                    <PlayerButton functionArg={() => {}} iconArg={<MdSkipNext />}/>
                    <PlayerButton iconArg={<MdOutlineRepeat />}/>
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