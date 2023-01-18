import React from 'react'

const PlayerButton = ({functionArg, iconArg}) => {
    return (
        <button onClick={functionArg} className='hover:bg-neutral-700 active:bg-neutral-600 rounded-full p-1'>
            {iconArg}
        </button>
    )
}

export default PlayerButton