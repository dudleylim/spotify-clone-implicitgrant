import React, { useContext, useEffect, useState } from 'react'
import Context from './ContextApi';
import PlayerButton from './PlayerButton'
import { BsPlay, BsPause, BsShuffle, BsFillVolumeUpFill } from 'react-icons/bs';
import { MdSkipPrevious, MdSkipNext, MdOutlineRepeat, MdOutlineRepeatOne } from 'react-icons/md';

const Player = (props) => {
    const contextApi = useContext(Context);
    const [player, setPlayer] = useState(undefined);

    // https://developer.spotify.com/documentation/web-playback-sdk/guide/
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: callback => { callback(contextApi.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });


            player.connect().then(success => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                } else {
                    console.log('bruh')
                }
            });
        };
    }, [contextApi.token])

    return (
        <footer className='bg-red-100 flex flex-row'>
            <div className='flex grow'>Album</div>
            
            <div className='flex flex-col grow-[2]'>
                <div className="flex flex-row">
                    <PlayerButton iconArg={<BsShuffle />}/>
                    <PlayerButton iconArg={<MdSkipPrevious />}/>
                    <PlayerButton iconArg={<BsPlay />}/>
                    <PlayerButton iconArg={<MdSkipNext />}/>
                    <PlayerButton iconArg={<MdOutlineRepeat />}/>
                    <button onClick={() => { player.togglePlay() }}>hi</button>
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