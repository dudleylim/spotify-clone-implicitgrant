import React from 'react'
import { useState, useEffect } from 'react';

const Context = React.createContext();
export default Context;

export const ContextApi = ({children}) => {
// variables, states, functions
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

    // search fetch

    
    // logout function
    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    }



// context data
    const contextData = {
        CLIENT_ID,
        REDIRECT_URI,
        AUTH_ENDPOINT,
        SCOPE,

        token,
        isLoggedIn,
        
        setIsLoggedIn,
        logout,
    };

// return function
    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}

