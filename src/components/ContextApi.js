import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Context = React.createContext();
export default Context;

export const ContextApi = ({children}) => {
// variables, states, functions
    // code for authorization
        const CLIENT_ID = 'e3b1df6e525e43a78f45aae2537a6534';
        // const REDIRECT_URI = 'http://localhost:3000/';
        const REDIRECT_URI = 'https://dudley-spomodoro.netlify.app/'; // uri of deployed app
        const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
        const SCOPE = 'user-read-email streaming user-read-private user-read-playback-state user-modify-playback-state';

        const [token, setToken] = useState("");
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const navigate = useNavigate();

        useEffect(() => {
            let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
            let token = window.localStorage.getItem("token");

            if (!token && urlParams) {
                try {
                    token = urlParams.get('access_token');
                    setToken(token);
                    console.log(urlParams);
                    // navigate('/');
                } catch (error) {
                    console.log(error)
                }

            }
        }, []);

    // playback sdk
        const [player, setPlayer] = useState({});
        const [isSongReady, setIsSongReady] = useState(false);
        const [isPlayerReady, setIsPlayerReady] = useState(false);

    // https://developer.spotify.com/documentation/web-playback-sdk/guide/
        useEffect(() => {
            console.log(token);
            if (token !== "" && token !== null) {
                console.log(token);
                const script = document.createElement("script");
                script.src = "https://sdk.scdn.co/spotify-player.js";
                script.async = true;
            
                document.body.appendChild(script);
            
                window.onSpotifyWebPlaybackSDKReady = () => {
                
                    const player = new window.Spotify.Player({
                        name: 'Web Playback SDK',
                        getOAuthToken: callback => { callback(token); },
                        volume: 0.5
                    });

                    setPlayer(player);
                
                    player.addListener('ready', ({ device_id }) => {
                        console.log('Ready with Device ID', device_id);
                        console.log(player);

                        // POSSIBLE POF
                        // navigate('/');
                        // POSSIBLE POF
                    });
                
                    player.addListener('not_ready', ({ device_id }) => {
                        console.log('Device ID has gone offline', device_id);
                    });
                
                    player.addListener('initialization_error', ({ message }) => { 
                        console.error(message);
                    });
                
                    player.addListener('authentication_error', ({ message }) => {
                        console.error(message);
                    });
                
                    player.addListener('account_error', ({ message }) => {
                        console.error(message);
                    });

                    player.addListener('autoplay_failed', () => {
                        console.log('autoplay failed');
                    });
                
                    player.addListener('player_state_changed', ({
                            position,
                            duration,
                            track_window: { current_track }
                        }) => {
                            console.log('Currently Playing', current_track);
                            setCurrentTrack(current_track);
                            console.log('Position in Song', position);
                            setUpdatedProgress(position);
                            console.log('Duration of Song', duration);
                            setCurrentDuration(duration);

                            setIsSongReady(true);
                    });
                
                    player.connect().then(success => {
                        if (success) {
                            console.log('The Web Playback SDK successfully connected to Spotify!');
                            setIsPlayerReady(true);
                        } else {
                            console.log('bruh')
                        }
                    });
                
                };
            }
        }, [token])

    // playback states
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

        const [currentTrack, setCurrentTrack] = useState(track);
        const [updatedProgress, setUpdatedProgress] = useState(0);
        const [currentDuration, setCurrentDuration] = useState(0);
        let durationSeconds = ((currentDuration % 60000) / 1000).toFixed(0);
        let durationMinutes = Math.floor(currentDuration / 60000);
        const [isPlaying, setIsPlaying] = useState(false);

    
    // logout function
        const logout = () => {
            player.disconnect();
            setToken("");
            // setPlayer({});
            setIsSongReady(false);
            setIsPlayerReady(false);
            window.localStorage.removeItem("token");
            navigate('/');
        }

    // custom play functions
        const resume = () => {
            if (isSongReady) {
                player.resume();
                setIsPlaying(true);
            }
        }

        const pause = () => {
            if (isSongReady) {
                player.pause();
                setIsPlaying(false);
            }

        }
    
        const togglePlay = () => {
            if (isSongReady) {
                if (isPlaying) {
                    player.pause();
                    setIsPlaying(false);
                } else {
                    player.resume();
                    setIsPlaying(true);
                }
            }
        }

    // test function
    // const testing = () => {
    //     player.togglePlay();
    // }


// context data
    const contextData = {
        CLIENT_ID,
        REDIRECT_URI,
        AUTH_ENDPOINT,
        SCOPE,

        token,
        isLoggedIn,
        player,
        currentTrack,
        updatedProgress,
        currentDuration,
        durationSeconds,
        durationMinutes,
        isPlaying,
        isSongReady,
        isPlayerReady,
        
        setIsLoggedIn,
        logout,
        setPlayer,
        setIsPlaying,
        togglePlay, pause, resume,
        // testing,
    };

// return function
    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}

