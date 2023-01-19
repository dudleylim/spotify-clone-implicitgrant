import React from 'react'

const PlayerButton = ({functionArg, iconArg, addClass}) => {
    return (
        <button onClick={functionArg} className={`hover:bg-neutral-700 active:bg-neutral-800 rounded-full p-1 ${addClass}`}>
            {iconArg}
        </button>
    )
}

export default PlayerButton