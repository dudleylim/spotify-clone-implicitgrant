import React from 'react'

const PlayerButton = ({functionArg, iconArg}) => {
    return (
        <button onClick={functionArg} className='hover:text-neutral-400 active:text-neutral-500 rounded-full p-1'>
            {iconArg}
        </button>
    )
}

export default PlayerButton