import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Context = React.createContext();
export default Context;

export const ContextApi = ({children}) => {
// variables, states, functions
    // navigator
    const navigate = useNavigate()

    // code for authorization
    const CLIENT_ID = 'e3b1df6e525e43a78f45aae2537a6534';
    const REDIRECT_URI = 'http://localhost:3000/';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const SCOPE = 'user-read-email streaming user-read-private';

    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
        let token = window.localStorage.getItem("token");

        if (!token && urlParams) {
            token = urlParams.get('access_token');
            setToken(token);
            console.log(urlParams);
        }
    }, []);

    // playback sdk
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
                getOAuthToken: callback => { callback(token); },
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
    }, [token])

    // search fetch

    
    // logout function
    const logout = () => {
        setToken("");
        player.disconnect();
        setPlayer(undefined);
        window.localStorage.removeItem("token");
        navigate('/');
    }



// context data
    const contextData = {
        CLIENT_ID,
        REDIRECT_URI,
        AUTH_ENDPOINT,
        SCOPE,

        token,
        isLoggedIn,
        player,
        
        setIsLoggedIn,
        logout,
        setPlayer,
    };

// return function
    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}

